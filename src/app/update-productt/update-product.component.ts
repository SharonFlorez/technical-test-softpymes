import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ProductsService } from 'src/services/products.service';
import { Products, ProductsDialog } from '../core/interfaces';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  public newAmount!: FormControl;
  public loading = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    private _productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: ProductsDialog,
  ) {}

  ngOnInit(): void {
    this.newAmount = new FormControl(this.data.amount, Validators.required);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onAmountChange(event: any): void {
    const newValue = event.target.value;
    this.newAmount.setValue(newValue);
  }

  public async onSave(): Promise<void> {
    this.loading = true;

    const newAmount = this.newAmount.value;
    const response = await this._productsService.updateData(
      this.data.id,
      newAmount,
    );

    if (response) {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.dialogRef.close();
    } else {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al actualizar el producto',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
