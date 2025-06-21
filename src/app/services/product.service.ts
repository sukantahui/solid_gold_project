import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private  http: HttpClient, private commonService: CommonService) { }
  
    getProductsWithRates(customerId: number){
      return this.http.get<any>(this.commonService.getAPI() + '/products/customer/'+customerId);
    }
    
}
