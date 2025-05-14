import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
    sidebarVisible = true;
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
}
