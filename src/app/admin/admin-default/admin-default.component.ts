import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-default',
  imports: [],
  templateUrl: './admin-default.component.html',
  styleUrl: './admin-default.component.scss',
})
export class AdminDefaultComponent {
  private customerService = inject(CustomerService);
  private router = inject(Router);
  getCustomers() {
    this.router.navigate(['/logout']);
    // this.customerService.fetchCustomers().subscribe((response: any) => {
    //   console.log('Customers:', response);
    // });
  }

}
