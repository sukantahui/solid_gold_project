import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-customer',
  imports: [RouterLink, RouterOutlet, RouterModule, SpinnerComponent, MatIconModule, CommonModule, MatTooltipModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  sidebarHovered = false;
  autoCloseTimeout: any;
  constructor(private router: Router) { }
  sidebarVisible = true;
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  ngOnInit() {
    // Auto-hide sidebar after 5 seconds (5000 ms)
    this.setAutoCloseTimeout();
  }
  get sidebarWidth() {
    return this.sidebarVisible ? '250px' : '0';  // match CSS width
  }
  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  setAutoCloseTimeout() {
    clearTimeout(this.autoCloseTimeout); // ✅ Prevent stacked timeouts
    this.autoCloseTimeout = setTimeout(() => {
      if (!this.sidebarHovered) {
        this.sidebarVisible = false;
      }
    }, 5000); // use 5000ms or your desired delay
  }
  onSidebarMouseLeave() {
    this.sidebarHovered = false;
    this.setAutoCloseTimeout();
  }
  onSidebarMouseEnter() {
    this.sidebarHovered = true;
    this.setAutoCloseTimeout();
  }
}








