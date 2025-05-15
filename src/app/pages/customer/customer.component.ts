import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";

@Component({
  selector: 'app-customer',
  imports: [RouterLink, RouterOutlet, SpinnerComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
    sidebarVisible = true;
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
}
