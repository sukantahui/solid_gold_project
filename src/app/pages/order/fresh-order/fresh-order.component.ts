import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import moment from 'moment';
import { Agent } from '../../../interfaces/agent';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CustomerInterface } from '../../../interfaces/customer.interface';

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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './fresh-order.component.html',
  styleUrl: './fresh-order.component.scss'
})
export class FreshOrderComponent {
  isProd = environment.production;

  orderForm!: FormGroup;
  agents?: Agent[];
  customers?: CustomerInterface[];

  products = [
    { id: 1, name: 'Gold Ring' },
    { id: 2, name: 'Gold Necklace' }
  ];
  
  private route = inject(ActivatedRoute);
  isVisible = true;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.dateAdapter.setLocale('en-GB'); // Forces dd/MM/yyyy format
    this.orderForm = this.fb.group({
      customer: ['', Validators.required],
      orderDate: [moment(), Validators.required],
      note: [''],
      items: this.fb.array([])
    });

    this.addItem(); // Add one default item
    //getting data from resolver
    this.agents = this.route.snapshot.data['agentsResolver'].data;
    this.customers = this.route.snapshot.data['customerResolver'].data;
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
