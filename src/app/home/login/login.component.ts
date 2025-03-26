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

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .subscribe({
          next: (response: any) => {
            console.log('✅ Login Successful:', response);

            // Store Token if exists
            if (response?.data?.token) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', response.data.user);
              this.router.navigate(['/admin']);
            } else {
              //user ID or password is incorrect
              //this part will not work because on any error it will go to error section below
            }
          },
          error: (error) => {
            console.error('❌ Login Failed:', error);

            if (error.status === 401) {
              Swal.fire({
                title: 'Error!',
                text: 'user ID or password is incorrect',
                icon: 'error',
                confirmButtonText: 'Cool',
              });
            } else if (error.status === 503) {
              Swal.fire({
                title: 'Error!',
                text: 'Service Unavailable, Start XAMP',
                icon: 'error',
                confirmButtonText: 'Okay',
              });
            } else if (error.status === 0) {
              alert(
                'Cannot connect to server. Check API URL or CORS settings.'
              );
            } else {
              alert('Login failed. Please try again.');
            }
          },
        });
    }
  }
}
