import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';
import { Agent } from '../../../interfaces/agent';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CustomerInterface } from '../../../interfaces/customer.interface';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interface';
//primeNGs
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

// Define typed item group
type OrderItemFormGroup = FormGroup<{
  productId: FormControl<number | null>;
  quantity: FormControl<number>;
  gini: FormControl<string>;
  wastage: FormControl<string>;
  size: FormControl<string>;
  note: FormControl<string>;
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
    ButtonModule, //primeNg
    InputTextModule, //primeNg
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    TextareaModule,
    CardModule,
    DividerModule
  ],
  templateUrl: './fresh-order.component.html',
  styleUrl: './fresh-order.component.scss',
})
export class FreshOrderComponent {
  isProd = environment.production;
  isDevMode = !environment.production;
  showDevData = true;
  itemNoteVisibility: boolean[] = [];
  orderForm!: OrderFormGroup;
  agents?: Agent[];
  customers?: CustomerInterface[];
  submitableData?: any;
  products?: Product[];
  private readonly route = inject(ActivatedRoute);
  isVisible = true;
  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<any>, private productService: ProductService) { }
  trackByIndex(index: number): number {
    return index;
  }
  toggleNote(index: number): void {
    this.itemNoteVisibility[index] = !this.itemNoteVisibility[index];
  }
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

    this.onCustomerChange(); // subscribe to customer change
  }

  get items(): FormArray<OrderItemFormGroup> {
    return this.orderForm.get('items') as FormArray<OrderItemFormGroup>;
  }

  createOrderItem(): OrderItemFormGroup {
    return this.fb.group({
      productId: this.fb.control<number | null>(null, Validators.required), // ✅ Fix here
      quantity: this.fb.nonNullable.control(1, [Validators.required, Validators.min(1)]),
      gini: this.fb.nonNullable.control('', Validators.required),
      wastage: this.fb.nonNullable.control('', Validators.required),
      size: this.fb.nonNullable.control('0-0-0'),
      note: this.fb.nonNullable.control('')
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

  onCustomerChange(): void {
    this.orderForm.get('customer')?.valueChanges.subscribe(customerId => {
      console.log('Selected Customer ID:', customerId);
      if (customerId) {
        this.productService.getProductsWithRates(+customerId).subscribe(response => {
          this.products = response.data;
        });
      }
      // Optional: perform actions based on customer
      const selectedCustomer = this.customers?.find(c => c.customerId === +customerId);
      if (selectedCustomer) {
        console.log('Selected Customer Object:', selectedCustomer);
        // Example: You can auto-fill a field or filter products for that customer
      }
    });
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
