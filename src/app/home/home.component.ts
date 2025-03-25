import { Component } from '@angular/core';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonService } from '../services/common.service';

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

  constructor(private commonService: CommonService) {
    console.log(this.commonService.getAPI());
  }

  showHide() {
    this.flag = !this.flag;
  }
}
