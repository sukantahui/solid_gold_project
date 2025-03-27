import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';


@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  public message="Please wait";
  constructor(public spinnerService: SpinnerService) {}


}
