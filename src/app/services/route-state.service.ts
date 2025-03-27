import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {
  private currentRoute = new BehaviorSubject<string>('');
  currentRoute$ = this.currentRoute.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentRoute.next((event as NavigationEnd).url);
    });
  }
}
