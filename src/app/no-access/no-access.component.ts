import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-access',
  imports: [CommonModule],
  templateUrl: './no-access.component.html',
  styleUrl: './no-access.component.scss',
})
export class NoAccessComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  public user=this.authService.getUser();
  public userTypeName = this.user.userType.userTypeName;
  goToHome() {
    this.router.navigate(['home']); // Redirect to home if token is missing
  }
}
