import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizationPage } from './pages/not-authorization/not-authorization.page';

const routes: Routes = [
  {
    path: 'not-authorization',
    component: NotAuthorizationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
