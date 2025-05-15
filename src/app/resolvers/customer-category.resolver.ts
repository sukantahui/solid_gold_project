import { inject, Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CustomerCategoryService } from '../services/customer-category.service';
import { finalize, Observable } from 'rxjs';
import { CustomerCategoryInterface } from '../interfaces/customer-category.interface';
import { SpinnerService } from '../services/spinner.service';




export const customerCategoryResolver: ResolveFn<CustomerCategoryInterface[]> = (route, state) => {
  const service = inject(CustomerCategoryService);
  const spinnerService = inject(SpinnerService);
  spinnerService.show();
  return service.getCategories().pipe(
    finalize(() => spinnerService.hide())
  );
}; 
