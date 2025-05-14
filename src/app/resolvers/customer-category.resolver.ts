import { inject, Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CustomerCategoryService } from '../services/customer-category.service';
import { Observable } from 'rxjs';
import { CustomerCategoryInterface } from '../interfaces/customer-category.interface';




export const customerCategoryResolver: ResolveFn<Observable<CustomerCategoryInterface[]>> = (route, state) => {
  const service = inject(CustomerCategoryService);
  return service.getCategories();
};
