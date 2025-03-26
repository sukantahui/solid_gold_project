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
  private TOKEN_USER = 'auth_user';
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getUser(): any | null {
    return JSON.stringify(localStorage.getItem(this.TOKEN_USER));
  }
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  setUser(user: any){
    localStorage.setItem(this.TOKEN_USER, JSON.stringify(user));
  }
  login(loginData: any) {
      return this.http.post<AuthResponseData>(this.commonService.getAPI() + '/login', loginData);
  }
  logout(){
    return this.http.post<AuthResponseData>(this.commonService.getAPI() + '/logout',{});
  }
  removeToken(){
    localStorage.removeItem(this.TOKEN_KEY);
  }
  removeUser(){
    localStorage.removeItem(this.TOKEN_USER);
  }

}
