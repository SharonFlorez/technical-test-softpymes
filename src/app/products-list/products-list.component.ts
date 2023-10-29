import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ProductsService } from 'src/services/products.service';
import { Products } from '../core/interfaces';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateProductComponent } from '../update-productt/update-product.component';

const COLUMNS = ['number', 'code', 'name', 'amount', 'price', 'actions'];

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  public displayedColumns = COLUMNS;
  public products: Products[] = [];
  public loading = true;

  constructor(
    private _productsService: ProductsService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
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
}
