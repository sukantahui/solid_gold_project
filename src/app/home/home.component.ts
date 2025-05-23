import { Component, inject } from '@angular/core';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { HomeFooterComponent } from "./home-footer/home-footer.component";

@Component({
  selector: 'app-home',
  imports: [MenuHomeComponent, RouterOutlet, RouterModule, HomeFooterComponent],
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
    let token = this.authService.getToken();

    if (token) {
      let user = this.authService.getUser();
      let userTypeName = user.userType.userTypeName;
      //already logged in
      // redirect to admin
      if (userTypeName === 'Admin') {
        this.router.navigate(['admin']);
      } else if (userTypeName === 'Developer') {
        this.router.navigate(['developer']);
      }else if (userTypeName === 'Owner') {
        this.router.navigate(['owner']);
      }else if (userTypeName === 'Manager') {
        this.router.navigate(['manager']);
      } else {
        this.router.navigate(['noAccess']);
      }
    } else {
      //redirect to login
      //this.router.navigate(['home']);
    }
  }

  showHide() {
    this.flag = !this.flag;
  }
}
