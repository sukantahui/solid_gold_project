import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';

@Component({
  selector: 'app-manager',
  imports: [MenuManagerComponent,RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {

}
