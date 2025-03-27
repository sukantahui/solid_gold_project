import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDefaultComponent } from './admin/admin-default/admin-default.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { NoAccessComponent } from './no-access/no-access.component';
import { authGuard } from './guards/auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { DeveloperComponent } from './developer/developer.component';
import { developerAuthGuard } from './guards/developer-auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { alreadyAuthGuard } from './guards/already-auth.guard';
import { HomeDefaultComponent } from './home/home-default/home-default.component';

export const routes: Routes = [
  // Default route redirect
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Home route with children
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [alreadyAuthGuard]
      },
      {
        path: '',
        component: HomeDefaultComponent,
        pathMatch: 'full'
      }
    ]
  },

  // Login redirect (from /login to /home/login)
  {
    path: 'login',
    redirectTo: 'home/login',
    pathMatch: 'full'
  },

  // Admin section
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminAuthGuard],
    children: [
      {
        path: '',
        component: AdminDefaultComponent,
        pathMatch: 'full'
      }
    ]
  },

  // Developer section
  {
    path: 'developer',
    component: DeveloperComponent,
    canActivate: [authGuard, developerAuthGuard]
  },

  // Logout route
  {
    path: 'logout',
    component: LogoutComponent
  },

  // Error/special pages
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: 'noAccess', component: NoAccessComponent },

  // Wildcard route (MUST be last)
  {
    path: '**',
    redirectTo: 'pageNotFound'
  }
];
