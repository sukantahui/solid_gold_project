import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password}).subscribe((response: any) => {
        console.log('Login Successful', response);

      }, (error) => {
        console.error('Login Failed', error);
      });

      alert('Login Successful!');
      //this.router.navigate(['/dashboard']); // Redirect to a dashboard page
    } else {
      alert('Invalid Credentials');
    }
  }
}
