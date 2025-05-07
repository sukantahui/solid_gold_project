import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { SpinnerService } from '../../services/spinner.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  private alertService = inject(AlertService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.spinnerService.show();

    this.authService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (response: any) => {
          if (response?.data?.token) {
            this.authService.setToken(response.data.token);
            this.authService.setUser(response.data.user);
            if(response.data.user.userType.userTypeName==='Admin'){
              this.router.navigate(['/admin']);
            }else if(response.data.user.userType.userTypeName==='Developer'){
              this.router.navigate(['/developer']);
            }else{
              this.router.navigate(['/home']);
            }

          } else {
            this.handleError('Invalid response from server');
          }
        },
        error: (error) => {
          this.handleError(error);
        },
        complete: () => {
          this.spinnerService.hide();
          this.isSubmitting = false;
        }
      });
  }
 
  private handleError(error: any) {
    this.spinnerService.hide();
    this.isSubmitting = false;

    console.error('❌ Login Failed:', error);

    if (error.status === 401) {
      this.alertService.error('Login Failed', 'User ID or Password mismatch');
    } else if (error.status === 503) {
      this.alertService.error('Service Unavailable, Start XAMPP', "Login Error" );
    } else if (error.status === 0) {

      this.alertService.error('Cannot connect to server. Check API URL or CORS settings.', error?.message || 'Unknown error');
    } else {
      this.alertService.error('Login failed. Please try again.', error?.message || 'Unknown error');
    }
  }
}
