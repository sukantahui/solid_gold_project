import { Component, inject, isDevMode } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { CustomerCategoryInterface } from '../../../interfaces/customer-category.interface';
import { CustomerService } from '../../../services/customer.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule, CommonModule,MatProgressSpinnerModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})
export class NewCustomerComponent {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  isDevMode = isDevMode();

  customerForm: FormGroup;
  customerCategories: CustomerCategoryInterface[] = [];
  isLoading: boolean = false;

  constructor() {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
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
    this.customerCategories = this.route.snapshot.data['customerCategories'].data;
    console.log('Loaded categories:', this.customerCategories);
    // initialize form here if needed
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Save Customer?',
      text: 'Do you want to save this customer?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        // When result is confirmed

        if (this.customerForm.invalid) {
          this.customerForm.markAllAsTouched();
          return;
        }

        this.isLoading = true;

        const customerData = this.customerForm.value;
        this.customerService.saveCustomer(customerData).subscribe({
          next: (res) => {
            const formData = this.customerForm.value;
            Swal.fire({
              title: '🎉 Customer Saved!',
              text: `👤 ${formData.customerName} Saved!`,
              icon: 'success',
              confirmButtonText: 'Great!',
              confirmButtonColor: '#198754',
              background: '#f0f9ff',
              color: '#1f2937',
              padding: '1.5rem',
              timer: 2500,
              timerProgressBar: true,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            });
            this.isLoading = false;
            console.log('Customer saved:', res)
          },
          error: (err) => {
            const errorMessage = err?.error?.message || 'Something went wrong.';

            Swal.fire({
              icon: 'error',
              title: '🚫 Save Failed',
              text: errorMessage,
              confirmButtonColor: '#d33'
            });
            this.isLoading=false;
            console.error('Validation Error:', err);
          }
        });
      }
    });

  }
}
