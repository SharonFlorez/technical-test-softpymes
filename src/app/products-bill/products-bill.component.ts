import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

import { ProductsWithQuantity } from '../core/interfaces';
import { ProductsService } from 'src/services/products.service';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-products-bill',
  templateUrl: './products-bill.component.html',
  styleUrls: ['./products-bill.component.scss'],
})
export class ProductsBillComponent implements OnInit, OnDestroy {
  public products: ProductsWithQuantity[] = [];
  public selectedProducts: ProductsWithQuantity[] = [];
  public loading = true;
  private _modalClosedSubscription: Subscription;

  constructor(
    private _productsService: ProductsService,
    private modalService: ModalService,
  ) {
    this._modalClosedSubscription = this.modalService.modalClosed$.subscribe(
      () => {
        this._getProducts();
      },
    );
  }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this._modalClosedSubscription.unsubscribe();
  }

  public addToInvoice(): void {
    this.selectedProducts = this.products.filter(
      (product) => product.quantityToSell > 0,
    );
  }

  public removeItem(id: string): void {
    this.selectedProducts = this.selectedProducts.filter(
      (item) => item.id !== id,
    );
  }

  public getTotalValue(): number {
    return this.selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantityToSell;
    }, 0);
  }

  public async createInvoice(): Promise<void> {
    this.loading = true;
    for (const product of this.selectedProducts) {
      const newAmount = product.amount - product.quantityToSell;
      if (newAmount >= 0) {
        const success = await this._productsService.updateData(
          product.id,
          newAmount,
        );
        if (success) {
          this.loading = false;
          this._generatePDF();
          this.modalService.closeModal();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al generar la factura',
            showConfirmButton: false,
            timer: 2500,
          });
          this.loading = false;
        }
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `No hay suficiente cantidad disponible para el producto: ${product.name}`,
          showConfirmButton: false,
          timer: 2500,
        });
        this.loading = false;
      }
    }

    this.selectedProducts = [];
    this.products.forEach((product) => {
      product.quantityToSell = 0;
    });
  }

  private _getProducts(): void {
    this._productsService
      .getProducts()
      .then((data) => {
        this.products = data;
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private _generatePDF(): void {
    const doc = new jsPDF();

    doc.text('Factura', 10, 10);
    doc.text('Productos seleccionados:', 10, 20);

    for (let i = 0; i < this.selectedProducts.length; i++) {
      const product = this.selectedProducts[i];
      const yPos = 30 + i * 10;
      doc.text(
        `#: ${i + 1}, Código: ${product.code} Producto: ${
          product.name
        }, Cantidad: ${product.quantityToSell}, Vlr Unitario: ${product.price}`,
        10,
        yPos,
      );
    }

    const totalYPos = 30 + this.selectedProducts.length * 10 + 10;
    doc.text('Total:', 10, totalYPos);
    const totalValue = this.getTotalValue();
    doc.text(totalValue.toString(), 50, totalYPos);

    doc.output('dataurlnewwindow');
  }
}
