import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu-owner',
  imports: [],
  templateUrl: './menu-owner.component.html',
  styleUrl: './menu-owner.component.scss'
})
export class MenuOwnerComponent {
    @Input() role!: string;
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
