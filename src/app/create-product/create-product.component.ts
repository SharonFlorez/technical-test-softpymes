import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ProductsService } from 'src/services/products.service';
import { Products } from '../core/interfaces';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public productForm: FormGroup = new FormGroup({});
  public products: Products[] = [];
  public error = false;
  public loading = false;

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private _productsService: ProductsService,
    private _formBuilder: FormBuilder,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      code: ['', [Validators.required, Validators.min(3)]],
      name: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]],
      price: ['', Validators.required],
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public async onSave(): Promise<void> {
    if (this.productForm.invalid) {
      this.error = true;
      return;
    }

    this.loading = true;
    const response = await this._productsService.addProduct(
      this.productForm.value,
    );

    if (response) {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto guardado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.dialogRef.close();
      this.modalService.closeModal();
    } else {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al crear el producto',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
