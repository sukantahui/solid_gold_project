import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { AdminComponent } from './user-pages/admin/admin.component';
import { AdminDefaultComponent } from './user-pages/admin/admin-default/admin-default.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { NoAccessComponent } from './no-access/no-access.component';
import { authGuard } from './guards/auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { DeveloperComponent } from './user-pages/developer/developer.component';
import { developerAuthGuard } from './guards/developer-auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { alreadyAuthGuard } from './guards/already-auth.guard';
import { HomeDefaultComponent } from './home/home-default/home-default.component';
import { ManagerComponent } from './user-pages/manager/manager.component';
import { ManagerDefaultComponent } from './user-pages/manager/manager-default/manager-default.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { OwnerComponent } from './user-pages/owner/owner.component';
import { OnwerDefaultComponent } from './user-pages/owner/onwer-default/onwer-default.component';
import { NewCustomerComponent } from './pages/customer/new-customer/new-customer.component';
import { customerCategoryResolver } from './resolvers/customer-category.resolver';
import { ShowCustomersComponent } from './pages/customer/show-customers/show-customers.component';
import { customerResolver } from './resolvers/customer.resolver';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
  // Default route redirect
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Home route with children
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [alreadyAuthGuard],
      },
      {
        path: '',
        component: HomeDefaultComponent,
        pathMatch: 'full',
      },
    ],
  },

  // Login redirect (from /login to /home/login)
  {
    path: 'login',
    redirectTo: 'user-pages/home/login',
    pathMatch: 'full',
  },

  // manager section
  {
    path: 'owner',
    component: OwnerComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: OnwerDefaultComponent,
        pathMatch: 'full',
      },
    ],
  },

  // manager section
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ManagerDefaultComponent,
        pathMatch: 'full',
      },
      {
        path: 'customer',
        component: CustomerComponent,
        children: [
          {
            path: 'newCustomer',
            component: NewCustomerComponent,
            resolve: {
              customerCategories: customerCategoryResolver,
            },
          },
          {
            path: 'showCustomer',
            component: ShowCustomersComponent,
            resolve: {
              customerResolver: customerResolver,
            },
          },

        ],
      },
      {
        path: 'order',
        component: OrderComponent,
      }
    ],
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
        pathMatch: 'full',
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
    ],
  },

  // Developer section
  {
    path: 'developer',
    component: DeveloperComponent,
    canActivate: [authGuard, developerAuthGuard],
  },

  // Logout route
  {
    path: 'logout',
    component: LogoutComponent,
  },

  // Error/special pages
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: 'noAccess', component: NoAccessComponent },

  // Wildcard route (MUST be last)
  {
    path: '**',
    redirectTo: 'pageNotFound',
  },
];
