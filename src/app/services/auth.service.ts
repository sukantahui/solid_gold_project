import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';



export interface AuthResponseData {
  status: boolean;
  message: string;
  data: {user: any, token: string};
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private commonService = inject(CommonService);
  private TOKEN_KEY = 'auth_token';
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  login(loginData: any) {
      return this.http.post<AuthResponseData>(this.commonService.getAPI() + '/login', loginData);
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
