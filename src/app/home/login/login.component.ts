import { Component } from '@angular/core';
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
            this.router.navigate(['/admin']);
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
      Swal.fire({
        title: 'Error!',
        text: 'Email or password is incorrect',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else if (error.status === 503) {
      Swal.fire({
        title: 'Error!',
        text: 'Service Unavailable, Start XAMPP',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else if (error.status === 0) {
      Swal.fire({
        title: 'Connection Error',
        text: 'Cannot connect to server. Check API URL or CORS settings.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Login failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}
