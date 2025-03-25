import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-menu-home',
  imports: [RouterModule],
  templateUrl: './menu-home.component.html',
  styleUrl: './menu-home.component.scss'
})
export class MenuHomeComponent {
  constructor(private router: Router) { }
  test() {
    this.router.navigate(['login']);
  }

}
