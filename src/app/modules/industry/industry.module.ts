import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryRoutingModule } from './industry-routing.module';
import { IndustryCreateComponent } from './industry-create/industry-create.component';
import { AppCommonModule } from 'src/app/app-common.module';
import { IndustryListComponent } from './industry-list/industry-list.component';


@NgModule({
  declarations: [
    IndustryCreateComponent,
    IndustryListComponent
  ],
  imports: [
    CommonModule,
    IndustryRoutingModule,
    AppCommonModule
  ]
})
export class IndustryModule { }
