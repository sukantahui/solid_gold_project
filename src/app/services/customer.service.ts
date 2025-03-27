import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private  http: HttpClient, private commonService: CommonService) { }

  fetchCustomers(){
    return this.http.get<any>(this.commonService.getAPI() + '/customers');
  }
}
