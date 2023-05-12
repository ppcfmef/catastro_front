import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { MapRepositoryPage } from './map-repository/map-repository.page';

const routes: Routes = [
  {
    path: '',
    component:  MapRepositoryPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gesrepcart', permissionType: 'read' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRepositoryRoutingModule { }
