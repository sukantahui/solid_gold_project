import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { BehaviorSubject } from 'rxjs';

export interface AuthResponseData {
  status: boolean;
  message: string;
  data: { user: any; token: string };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private commonService = inject(CommonService);
  private TOKEN_KEY = 'auth_token';
  private TOKEN_USER = 'auth_user';


  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Method to check current auth state
  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Call this whenever auth state changes
  private updateAuthState(): void {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  checkAuthentication() {
    const token = this.getToken();
    const isAuthenticated = !!token;
    this.isAuthenticatedSubject.next(isAuthenticated);
    return isAuthenticated;
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getUser(): any | null {
    // return JSON.parse(localStorage.getItem(this.TOKEN_USER));

    const userString = localStorage.getItem(this.TOKEN_USER); // Retrieve as a string
    const userObject = userString ? JSON.parse(userString) : null; // Convert to object
    return userObject; // Return object
  }
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.checkAuthentication();
  }
  setUser(user: any) {
    localStorage.setItem(this.TOKEN_USER, JSON.stringify(user)); 
    this.checkAuthentication();
  }
  login(loginData: any) {
    return this.http.post<AuthResponseData>(this.commonService.getAPI() + '/login', loginData);
  }
  logout() {
    return this.http.post<AuthResponseData>(
      this.commonService.getAPI() + '/logout',
      {}
    );
  }
  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.checkAuthentication();
  }
  removeUser() {
    localStorage.removeItem(this.TOKEN_USER);
    localStorage.removeItem(this.TOKEN_KEY);
    this.checkAuthentication();
  }
}
