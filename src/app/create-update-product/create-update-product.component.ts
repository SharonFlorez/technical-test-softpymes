import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductsService } from 'src/services/products.service';
import { Products } from '../core/interfaces';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss'],
})
export class CreateUpdateProductComponent implements OnInit {
  public productForm: FormGroup = new FormGroup({});
  public products: Products[] = [];
  public loading = false;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateProductComponent>,
    private _productsService: ProductsService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Products,
  ) {}

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public async onSave(): Promise<void> {
    this.loading = true;
    const response = await this._productsService.addProduct(
      this.productForm.value,
    );

    if (response) {
      this.loading = false;
      this.productForm.reset();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto guardado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.dialogRef.close();
    }
  }
}
