import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _isLoading = new BehaviorSubject<boolean>(false);

  // Public observable for components to subscribe to
  public isLoading$ = this._isLoading.asObservable();

  /**
   * Show the spinner
   */
  show(): void {
    this._isLoading.next(true);
  }

  /**
   * Hide the spinner
   */
  hide(): void {
    this._isLoading.next(false);
  }
}
