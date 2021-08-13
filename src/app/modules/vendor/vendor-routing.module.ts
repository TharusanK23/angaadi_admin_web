import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from '../shared/errors/page404/page404.component';
import { VendorCreateComponent } from './vendor-create/vendor-create.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vendor-create',
    pathMatch: 'full',
  },
  {
    path: 'vendor-create',
    component: VendorCreateComponent,
    data: {
      title: 'Vendor Create Page'
    }
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
