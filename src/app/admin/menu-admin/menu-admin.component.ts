import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-admin',
  imports: [],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.scss',
})
export class MenuAdminComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  logoutMe() {
    this.authService.logout().subscribe((response:any) => {
      this.authService.removeToken();
      this,this.authService.removeUser();
      this.router.navigate(['/logout']);
    });

  }
}
