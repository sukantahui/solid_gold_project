import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule, CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule ],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})
export class NewCustomerComponent {
  customerForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerCategoryId: ['', Validators.required],
      mailingName: [''],
      email: ['', [Validators.email]],
      phone: [''],
      mobile1: [''],
      mobile2: [''],
      whatsapp: [''],
      address: [''],
      pinCode: [''],
      openingGoldBalance: [0, Validators.min(0)],
      openingCashBalance: [0, Validators.min(0)]
    });
  }
  onSubmit() {
    if (this.customerForm.valid) {
      console.log('Form Submitted:', this.customerForm.value);
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
