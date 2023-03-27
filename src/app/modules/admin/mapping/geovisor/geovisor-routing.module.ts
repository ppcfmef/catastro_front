import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeovisorComponent } from './pages/geovisor/geovisor.component';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';

const routes: Routes = [
    {
      path: '',
      component:  GeovisorComponent,
      canActivate: [NavigationAuthorizationGuard],
      data: { id: 'gescargeo', permissionType: 'read' },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeovisorRoutingModule { }
