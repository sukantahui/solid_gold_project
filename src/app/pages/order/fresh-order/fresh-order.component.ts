import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';
import { Agent } from '../../../interfaces/agent';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CustomerInterface } from '../../../interfaces/customer.interface';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interface';
//primeNGs


// Define typed item group
type OrderItemFormGroup = FormGroup<{
  productId: FormControl<number | null>;
  quantity: FormControl<number>;
  gini: FormControl<string>;
  wastage: FormControl<string>;
  size: FormControl<string>;
  note: FormControl<string>;
  showNote: FormControl<boolean>; // 👈 Add this
}>;

// Define typed root form
type OrderFormGroup = FormGroup<{
  customer: FormControl<number | null>;
  customerName: FormControl<string>;
  orderDate: FormControl<string>;
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
  ],
  templateUrl: './fresh-order.component.html',
  styleUrl: './fresh-order.component.scss',
})
export class FreshOrderComponent {
  isProd = environment.production;
  isDevMode = !environment.production;
  filteredCustomers: CustomerInterface[] = [];
  showSuggestions = false;
  showDevData = true;
  itemNoteVisibility: boolean[] = [];
  orderForm!: OrderFormGroup;
  agents?: Agent[];
  customers?: CustomerInterface[];
  submitableData?: any;
  products?: Product[];
  private readonly route = inject(ActivatedRoute);
  isVisible = true;
  today = new Date().toISOString().split('T')[0];
  loadingProducts = false;
  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<any>, private productService: ProductService, private cdr: ChangeDetectorRef) { }
  trackByItemId(index: number, group: AbstractControl): number | null {
    return group.value?.productId ?? index;
  }
  toggleNote(index: number): void {
    this.itemNoteVisibility[index] = !this.itemNoteVisibility[index];
  }
  ngOnInit(): void {
    this.dateAdapter.setLocale('en-GB');

    this.orderForm = this.fb.group({
      customer: this.fb.control<number | null>(null, Validators.required), // ✅ valid
      customerName: this.fb.nonNullable.control('', Validators.required),
      orderDate: this.fb.nonNullable.control(this.today, Validators.required),
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


  get customerNameControl(): FormControl<string> {
    return this.orderForm.get('customerName') as FormControl<string>;
  }
  onCustomerNameInput(): void {
    const name = this.orderForm.get('customerName')?.value.toLowerCase() || '';
    this.filteredCustomers = this.customers?.filter(c =>
      c.customerName.toLowerCase().includes(name)
    ) || [];
  }

  selectCustomer(c: CustomerInterface): void {
    this.orderForm.patchValue({
      customer: c.customerId,
      customerName: c.customerName
    });

    this.filteredCustomers = [];
    this.showSuggestions = false;

    // this.productService.getProductsWithRates(+c.customerId).subscribe(response => {
    //   this.products = response.data;
    // });
  }
  clearCustomer(): void {
    this.orderForm.patchValue({ customer: null, customerName: '' });
    this.filteredCustomers = [];
    this.products = [];
  }

  hideSuggestions(): void {
    setTimeout(() => this.showSuggestions = false, 150);
  }


  createOrderItem(): OrderItemFormGroup {
    return this.fb.group({
      productId: this.fb.control<number | null>(null, Validators.required),
      quantity: this.fb.nonNullable.control(1, [Validators.required, Validators.min(1)]),
      gini: this.fb.nonNullable.control('', Validators.required),
      wastage: this.fb.nonNullable.control('', Validators.required),
      size: this.fb.nonNullable.control('0-0-0'),
      note: this.fb.nonNullable.control(''),
      showNote: this.fb.nonNullable.control(false),
    }) as OrderItemFormGroup;
  }

  addItem(): void {
    const itemGroup = this.createOrderItem();
    this.items.push(itemGroup);

    // 👇 Add a default visibility state
    this.itemNoteVisibility.push(false);

    // 👇 Use `itemGroup` directly instead of relying on index
    itemGroup.get('productId')?.valueChanges.subscribe(productId => {
      if (productId == null) return;

      const selectedProduct = this.products?.find(p => p.productId === +productId);
      const wastageControl = itemGroup.get('wastage'); // 👈 This is safe and stable

      if (selectedProduct && wastageControl) {
        wastageControl.setValue(String(selectedProduct.wastegePercentage ?? ''));
      }
    });

    setTimeout(() => {
      const lastItem = document.querySelector('.order-item:last-child');
      lastItem?.scrollIntoView({ behavior: 'smooth' });
    });
  }


  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      this.itemNoteVisibility.splice(index, 1); // Sync note visibility array
      this.cdr.detectChanges(); // 👈 Force view update
    }
  }

  onCustomerChange(): void {
    this.orderForm.get('customer')?.valueChanges.subscribe(customerId => {
      console.log('Selected Customer ID:', customerId);

      if (customerId != null) {
        this.products = [];
        this.loadingProducts = true;
        this.productService.getProductsWithRates(+customerId).subscribe(response => {
          this.products = response.data;
          this.loadingProducts = false;
        });

        const selectedCustomer = this.customers?.find(c => c.customerId === customerId);
        if (selectedCustomer) {
          console.log('Selected Customer Object:', selectedCustomer);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const raw = this.orderForm.value;

      const formattedData = {
        ...raw,
        orderDate: raw.orderDate // already a string in "YYYY-MM-DD" format
      };

      this.submitableData = formattedData;
      console.log('Order submitted:', formattedData);
      // TODO: send formattedData to API...
    }
  }
}
