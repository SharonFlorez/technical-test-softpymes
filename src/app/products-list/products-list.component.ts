import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { ProductsService } from 'src/services/products.service';
import { Products } from '../core/interfaces';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateProductComponent } from '../update-productt/update-product.component';
import { ModalService } from 'src/services/modal.service';

const COLUMNS = ['number', 'code', 'name', 'amount', 'price', 'actions'];

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public displayedColumns = COLUMNS;
  public products: Products[] = [];
  public loading = true;
  private _modalClosedSubscription: Subscription;

  constructor(
    private _productsService: ProductsService,
    private _dialog: MatDialog,
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

  public createProduct(): void {
    this._dialog.open(CreateProductComponent, {
      panelClass: 'dialog-style',
    });
  }

  public updateProduct(product: Products): void {
    this._dialog.open(UpdateProductComponent, {
      panelClass: 'dialog-style',
      data: {
        id: product.id,
        code: product.code,
        name: product.name,
        amount: product.amount,
        price: product.price,
      },
    });
  }

  public async deleteProduct(id: string): Promise<void> {
    const response = await this._productsService.deleteProduct(id);
    if (response) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto eliminado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.modalService.closeModal();
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al eliminar el producto',
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
}
