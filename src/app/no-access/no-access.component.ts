import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-access',
  imports: [],
  templateUrl: './no-access.component.html',
  styleUrl: './no-access.component.scss',
})
export class NoAccessComponent {
  private router = inject(Router);
  goToHome() {

    this.router.navigate(['home']); // Redirect to home if token is missing
  }
}
