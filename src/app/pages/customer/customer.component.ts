import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [RouterLink, RouterOutlet, SpinnerComponent, MatIconModule, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  sidebarVisible = true;
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  ngOnInit() {
    // Auto-hide sidebar after 5 seconds (5000 ms)
    setTimeout(() => {
      this.sidebarVisible = false;
    }, 5000);
  }
  get sidebarWidth() {
    return this.sidebarVisible ? '250px' : '0';  // match CSS width
  }
}








