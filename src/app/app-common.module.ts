import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CKEditorModule } from 'ckeditor4-angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TopBarComponent } from './modules/shared/top-bar/top-bar.component';
import { SideBarComponent } from './modules/shared/side-bar/side-bar.component';
import { Page404Component } from './modules/shared/errors/page404/page404.component';
import { Page500Component } from './modules/shared/errors/page500/page500.component';
import { IndustrySearchPipe } from './pipes/industry-search.pipe';
import { ListLoadingComponent } from './modules/shared/loading/list-loading/list-loading.component';


const packageModule = [
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule,
  NgSelectModule,
  ToastrModule.forRoot(),
  GooglePlaceModule,
  ImageCropperModule,
  CKEditorModule,
  ColorPickerModule,
];

export const CommonComponents = [Page404Component, Page500Component, ListLoadingComponent];
export const HelperComponents = [];
export const pipes = [IndustrySearchPipe];


@NgModule({
  declarations: [
    CommonComponents,
    HelperComponents,
    pipes,
  ],
  imports: [
    CommonModule,
    packageModule
  ],
  exports: [
    packageModule,
    CommonComponents,
    HelperComponents,
    pipes
  ],
})

export class AppCommonModule { }




