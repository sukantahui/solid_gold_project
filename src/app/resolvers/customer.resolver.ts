import { ResolveFn } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { CustomerInterface } from '../interfaces/customer.interface';
import { CustomerService } from '../services/customer.service';
import { SpinnerService } from '../services/spinner.service';
import { inject } from '@angular/core';

export const customerResolver: ResolveFn<Observable<CustomerInterface[]> > = (route, state) => {
    const service = inject(CustomerService);
    const spinnerService = inject(SpinnerService);
    spinnerService.show();
      return service.getCustomers().pipe(
        finalize(() => spinnerService.hide())
      );
};


