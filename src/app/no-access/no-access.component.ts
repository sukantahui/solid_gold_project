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
  public userTypeName = this.user?.userType.userTypeName || 'none';
  goToHome() {
    this.router.navigate(['home']); // Redirect to home if token is missing
  }
  countdown: number = 10;
  private countdownInterval: any;




  ngOnInit(): void {
    // Perform logout
    this.authService.logout();

    // Start countdown
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.router.navigate(['home']);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  navigateNow(): void {
    clearInterval(this.countdownInterval);
    this.router.navigate(['home']);
  }
}
