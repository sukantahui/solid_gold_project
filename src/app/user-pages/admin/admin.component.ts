import { Component } from '@angular/core';
import { MenuAdminComponent } from "./menu-admin/menu-admin.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [MenuAdminComponent,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
