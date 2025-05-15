import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu-manager',
  imports: [RouterLink],
  templateUrl: './menu-manager.component.html',
  styleUrl: './menu-manager.component.scss',
})
export class MenuManagerComponent {
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
