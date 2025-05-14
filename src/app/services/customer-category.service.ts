import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerCategoryInterface } from '../interfaces/customer-category.interface';
import { CommonService } from './common.service';





@Injectable({
  providedIn: 'root'
})
export class CustomerCategoryService {

  private apiUrl = '127.0.0.1/solid_gold/solid_gold_api/public/api/customer-categories';

  constructor(private http: HttpClient, private commonService: CommonService) {}

  getCategories(): Observable<CustomerCategoryInterface[]> {
    return this.http.get<CustomerCategoryInterface[]>(this.commonService.getAPI() + '/customer-categories');
  }
}
