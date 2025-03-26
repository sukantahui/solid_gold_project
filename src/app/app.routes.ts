import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
          { path: 'login', component: LoginComponent },

        ]
    },

    {
      path: 'admin',
      component: AdminComponent,
    
  }
];
