import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu-developer',
  imports: [],
  templateUrl: './menu-developer.component.html',
  styleUrl: './menu-developer.component.scss',
})
export class MenuDeveloperComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  logoutMe() {
    this.authService.logout().subscribe((response: any) => {
      this.authService.removeToken();
      this, this.authService.removeUser();
      this.router.navigate(['/logout']);
    });
  }
}
