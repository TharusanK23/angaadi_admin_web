import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from '../shared/errors/page404/page404.component';
import { IndustryCreateComponent } from './industry-create/industry-create.component';
import { IndustryListComponent } from './industry-list/industry-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'industry-list',
    pathMatch: 'full',
  },
  {
    path: 'industry-list',
    component: IndustryListComponent,
    data: {
      title: 'Industry List Page'
    },
  },
  {
    path: 'industry-create',
    component: IndustryCreateComponent,
    data: {
      title: 'Industry Create Page'
    },
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
