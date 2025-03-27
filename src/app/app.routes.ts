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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login'
        , component: LoginComponent
        , canActivate: [alreadyAuthGuard]
      }
    ],
  },
  {
    path: 'login',
    redirectTo: 'home/login',
    pathMatch: 'full'
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminAuthGuard],
    children: [{ path: '', component: AdminDefaultComponent }],
  },
  {
    path: 'developer',
    canActivate: [authGuard, developerAuthGuard],
    component: DeveloperComponent,
  },

  { path: 'logout', component: LogoutComponent },

  { path: 'pageNotFound', component: PageNotFoundComponent }, // Wildcard route (MUST be last)
  { path: 'noAccess', component: NoAccessComponent }, // Wildcard route (MUST be last)
  { path: '**', redirectTo: 'pageNotFound' }, // Wildcard route (MUST be last)
];
