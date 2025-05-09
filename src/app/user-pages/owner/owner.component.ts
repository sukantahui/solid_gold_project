import { Component } from '@angular/core';
import { MenuManagerComponent } from "../manager/menu-manager/menu-manager.component";
import { RouterOutlet } from '@angular/router';
import { MenuOwnerComponent } from "./menu-owner/menu-owner.component";

@Component({
  selector: 'app-owner',
  imports: [RouterOutlet, MenuOwnerComponent],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss'
})
export class OwnerComponent {
    public pageTitle="Ownere";
}
