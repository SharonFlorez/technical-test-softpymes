import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ProductsService } from 'src/services/products.service';
import { Products } from '../core/interfaces';
import { CreateUpdateProductComponent } from '../create-update-product/create-update-product.component';

const COLUMNS = ['number', 'code', 'name', 'amount', 'price', 'edit'];

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

  public manageProduct(purpose: string, product?: Products): void {
    this._dialog.open(CreateUpdateProductComponent, {
      panelClass: 'dialog-style',
      data: {
        purpose,
        product,
      },
    });
  }
}
