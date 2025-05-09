import { Component } from '@angular/core';
import { MenuDeveloperComponent } from "./menu-developer/menu-developer.component";
import { RouterOutlet } from '@angular/router';
import { DeveloperFooterComponent } from "./developer-footer/developer-footer.component";

@Component({
  selector: 'app-developer',
  imports: [MenuDeveloperComponent, RouterOutlet, DeveloperFooterComponent],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.scss'
})
export class DeveloperComponent {

}
