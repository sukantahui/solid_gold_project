import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-fresh-order',
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './fresh-order.component.html',
  styleUrl: './fresh-order.component.scss'
})
export class FreshOrderComponent {
  orderForm!: FormGroup;

  customers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];

  products = [
    { id: 1, name: 'Gold Ring' },
    { id: 2, name: 'Gold Necklace' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      customer: ['', Validators.required],
      orderDate: [new Date(), Validators.required],
      note: [''],
      items: this.fb.array([])
    });

    this.addItem(); // Add one default item
  }

  // Get items FormArray
  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  // Add a product item row
  addItem(): void {
    this.items.push(this.fb.group({
      product: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      gini: ['', Validators.required],
      wastage: ['', Validators.required],
      size: ['0-0-0']
    }));
  }

  // Remove a product item row
  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log('Order submitted:', this.orderForm.value);
      // send to backend...
    }
  }
}
