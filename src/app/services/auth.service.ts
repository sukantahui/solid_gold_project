import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';



export interface AuthResponseData {
  status: boolean;
  message: string;
  data: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private commonService = inject(CommonService);


  login(loginData: any) {
      return this.http.post<AuthResponseData>(this.commonService.getAPI() + '/login', loginData);
  }

}
