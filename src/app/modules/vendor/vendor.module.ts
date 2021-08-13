import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorCreateComponent } from './vendor-create/vendor-create.component';
import { AppCommonModule } from 'src/app/app-common.module';


@NgModule({
  declarations: [
    VendorCreateComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    AppCommonModule
  ]
})
export class VendorModule { }
