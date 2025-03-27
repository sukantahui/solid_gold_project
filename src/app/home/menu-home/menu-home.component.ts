import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RouteStateService } from '../../services/route-state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu-home',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './menu-home.component.html',
  styleUrl: './menu-home.component.scss',
})
export class MenuHomeComponent {
  routeState = inject(RouteStateService);
  currentRoute$ = this.routeState.currentRoute$;
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['home','login']);
  }
}
