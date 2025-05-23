import { Component, inject } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-admin-default',
  imports: [],
  templateUrl: './admin-default.component.html',
  styleUrl: './admin-default.component.scss',
})
export class AdminDefaultComponent {
  private customerService = inject(CustomerService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);
  getCustomers() {

    this.alertService.error('test','1234');
    // const user=this.authService.getUser();
    // console.log(user.userType.userTypeName);
    // this.customerService.fetchCustomers().subscribe((response: any) => {
    //   console.log('Customers:', response);
    // });
  }

}
