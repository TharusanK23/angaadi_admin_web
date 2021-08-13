import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './modules/layouts/default-layout/default-layout.component';

import { SideBarComponent } from './modules/shared/side-bar/side-bar.component';
import { TopBarComponent } from './modules/shared/top-bar/top-bar.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VendorCreateComponent } from './modules/vendor/vendor-create/vendor-create.component';
import { IndustryCreateComponent } from './modules/industry/industry-create/industry-create.component';

import { Page404Component } from './modules/shared/errors/page404/page404.component';
import { Page500Component } from './modules/shared/errors/page500/page500.component';
import { LoginLayoutComponent } from './modules/layouts/login-layout/login-layout.component';
import { DeActiveService } from './helpers/auth-guard/de-active.service';
import { ActiveService } from './helpers/auth-guard/active.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'auth',
    component: LoginLayoutComponent,
    data: {
      title: 'Login Page'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ],
    canActivate: [DeActiveService]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'industry',
        loadChildren: () => import('./modules/industry/industry.module').then(m => m.IndustryModule)
      },
      {
        path: 'home',
        component: DashboardComponent,
      }
    ],
    canActivate: [ActiveService]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'vendor',
        loadChildren: () => import('./modules/vendor/vendor.module').then(m => m.VendorModule)
      },
      {
        path: 'home',
        component: DashboardComponent,
      }
    ],
    canActivate: [ActiveService]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'products',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'home',
        component: DashboardComponent,
      }
    ],
    canActivate: [ActiveService]
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [LoginLayoutComponent, DefaultLayoutComponent, DashboardComponent];

export const CommonComponents = [TopBarComponent, SideBarComponent];
