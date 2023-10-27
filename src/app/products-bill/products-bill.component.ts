import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const PRODUCTS = [
  {
    code: 123,
    name: 'Celular',
    amount: 5,
    price: 1000000,
  },
  {
    code: 456,
    name: 'Computador',
    amount: 10,
    price: 2000000,
  },
  {
    code: 789,
    name: 'Cámara',
    amount: 15,
    price: 500000,
  },
];

@Component({
  selector: 'app-products-bill',
  templateUrl: './products-bill.component.html',
  styleUrls: ['./products-bill.component.scss'],
})
export class ProductsBillComponent implements OnInit {
  public productForm: FormGroup = new FormGroup({});
  public displayedColumns: string[] = [
    'number',
    'code',
    'name',
    'amount',
    'price',
    'edit',
  ];
  public products = PRODUCTS;
  public selectedMood = '';
  public journalEntry = '';
  public sentimentResult = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      code: ['', Validators.required],
      product: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  public editProduct(): void {
    alert('di click en edit');
  }

  public async onSave(): Promise<void> {
    console.log(this.productForm.value);
  }
}
