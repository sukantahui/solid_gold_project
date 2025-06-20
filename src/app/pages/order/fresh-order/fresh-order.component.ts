import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import moment, { Moment } from 'moment';
import { Agent } from '../../../interfaces/agent';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CustomerInterface } from '../../../interfaces/customer.interface';

// Define typed item group
type OrderItemFormGroup = FormGroup<{
  product: FormControl<string>;
  quantity: FormControl<number>;
  gini: FormControl<string>;
  wastage: FormControl<string>;
  size: FormControl<string>;
}>;

// Define typed root form
type OrderFormGroup = FormGroup<{
  customer: FormControl<string>;
  orderDate: FormControl<Moment>;
  note: FormControl<string>;
  items: FormArray<OrderItemFormGroup>;
}>;

@Component({
  selector: 'app-fresh-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule
  ],
  templateUrl: './fresh-order.component.html',
  styleUrl: './fresh-order.component.scss'
})
export class FreshOrderComponent {
  isProd = environment.production;

  orderForm!: OrderFormGroup;
  agents?: Agent[];
  customers?: CustomerInterface[];
  submitableData?: any;
  products = [
    { id: 1, name: 'Gold Ring' },
    { id: 2, name: 'Gold Necklace' }
  ];

  private readonly route = inject(ActivatedRoute);
  isVisible = true;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.dateAdapter.setLocale('en-GB');

    this.orderForm = this.fb.nonNullable.group({
      customer: this.fb.nonNullable.control('', Validators.required),
      orderDate: this.fb.nonNullable.control(moment(), Validators.required),
      note: this.fb.nonNullable.control(''),
      items: this.fb.array<OrderItemFormGroup>([])
    });

    this.addItem();

    this.agents = this.route.snapshot.data['agentsResolver']?.data || [];
    this.customers = this.route.snapshot.data['customerResolver']?.data || [];
  }

  get items(): FormArray<OrderItemFormGroup> {
    return this.orderForm.get('items') as FormArray<OrderItemFormGroup>;
  }

  createOrderItem(): OrderItemFormGroup {
    return this.fb.group({
      product: this.fb.nonNullable.control('', Validators.required),
      quantity: this.fb.nonNullable.control(1, [Validators.required, Validators.min(1)]),
      gini: this.fb.nonNullable.control('', Validators.required),
      wastage: this.fb.nonNullable.control('', Validators.required),
      size: this.fb.nonNullable.control('0-0-0')
    });
  }

  addItem(): void {
    this.items.push(this.createOrderItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const raw = this.orderForm.value;

      const formattedData = {
        ...raw,
        orderDate: raw.orderDate?.format('YYYY-MM-DD') || null
      };
      this.submitableData = formattedData;
      console.log('Order submitted:', formattedData);
      // send formattedData to API...
    }
  }
}
