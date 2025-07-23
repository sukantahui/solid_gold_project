import { Component, inject, isDevMode } from '@angular/core';
import { CustomerInterface } from '../../../interfaces/customer.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { CustomerService } from '../../../services/customer.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-show-customers',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './show-customers.component.html',
  styleUrl: './show-customers.component.scss',
})
export class ShowCustomersComponent {
  selectedCustomer: CustomerInterface | null = null;
  isDevMode = isDevMode();
  isDevAreaVisible = true;
  showEditDiv = false;
  customerForm: FormGroup;
  private fb = inject(FormBuilder);                                                                           
  private customerService = inject(CustomerService);
  customerCategories: any;
  editCustomer(customer: CustomerInterface) {
    this.showEditDiv = true;
    this.selectedCustomer = customer;
    this.customerForm.patchValue({
      customerName: customer.customerName,
      mailingName: customer.mailingName,
     customerCategoryId: customer.category?.customerCategoryId,
     email: customer.contact?.email,
     phone: customer.contact?.phone,
     mobile1: customer.contact?.mobile1,
     mobile2: customer.contact?.mobile2,
     whatsapp: customer.contact?.whatsapp,
     address: customer.contact?.address,
     pincode: customer.contact?.pinCode,
    
    });
  }
  cancelEditCustomer(){
    this.showEditDiv = false;
    this.customerForm.reset();
  }
  
  customers: CustomerInterface[] = [];
  private route = inject(ActivatedRoute);
  constructor() {
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.maxLength(10)]],
      customerCategoryId: [1, Validators.required],
      mailingName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      mobile1: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      mobile2: ['', [Validators.pattern(/^\d{10,20}$/)]],
      whatsapp: ['', [Validators.pattern(/^\d{10,15}$/)]],
      address: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      openingGoldBalance: [0, [Validators.required, Validators.min(0)]],
      openingCashBalance: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.customers = this.route.snapshot.data['customerResolver'].data;
    console.log('Loaded categories:', this.customers);
  }
  onSubmit() {

  }
}
