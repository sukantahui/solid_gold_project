import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  countdown: number = 10;
  private countdownInterval: any;
  private authService = inject(AuthService);
  private router = inject(Router);


  ngOnInit(): void {
    // Perform logout
    this.authService.logout();

    // Start countdown
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.router.navigate(['home','login']);
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
    this.router.navigate(['home','login']);
  }
}
