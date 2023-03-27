import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { NotAuthorizationPage } from './pages/not-authorization/not-authorization.page';


@NgModule({
  declarations: [
    NotAuthorizationPage
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
