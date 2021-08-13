import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../app-common.module';

import { ProductRoutingModule } from './product-routing.module';
import { ProductCreateComponent } from './product-create/product-create.component';


@NgModule({
  declarations: [
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AppCommonModule
  ]
})
export class ProductModule { }
