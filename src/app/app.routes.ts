import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDefaultComponent } from './admin/admin-default/admin-default.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';
import { NoAccessComponent } from './no-access/no-access.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [{ path: '', component: AdminDefaultComponent }],
  },
  { path: 'pageNotFound', component: PageNotFoundComponent }, // Wildcard route (MUST be last)
  { path: 'noAccess', component: NoAccessComponent }, // Wildcard route (MUST be last)
  { path: '**', redirectTo: 'pageNotFound' } // Wildcard route (MUST be last)
];
