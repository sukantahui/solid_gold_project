import { Component, inject } from '@angular/core';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [MenuHomeComponent, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  environment_test = environment.TEST;
  title: string = 'Coder & AccoTax';
  flag = false;
  private commonService = inject(CommonService);
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {
    let token= this.authService.getToken();
    if(token){
      //already logged in
      // redirect to admin
      this.router.navigate(['/admin']);
    }
  }

  showHide() {
    this.flag = !this.flag;
  }
}
