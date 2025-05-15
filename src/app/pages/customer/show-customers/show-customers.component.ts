import { Component, inject, isDevMode } from '@angular/core';
import { CustomerInterface } from '../../../interfaces/customer.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-show-customers',
  imports: [CommonModule],
  templateUrl: './show-customers.component.html',
  styleUrl: './show-customers.component.scss',
})
export class ShowCustomersComponent {
  isDevMode = isDevMode();
  customers: CustomerInterface[] = [];
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.customers = this.route.snapshot.data['customerResolver'].data;
    console.log('Loaded categories:', this.customers);
  }
}
