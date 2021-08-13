import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCreateComponent } from '../../modules/product/product-create/product-create.component';

import { Page404Component } from '../..//modules/shared/errors/page404/page404.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-create',
    pathMatch: 'full',
  },
  {
    path: 'product-create',
    component: ProductCreateComponent,
    data: {
      title: 'Product Create Page'
    }
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
