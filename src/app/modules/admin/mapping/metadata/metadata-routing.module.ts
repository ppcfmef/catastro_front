import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataPage } from './pages/metadata/metadata.page';
import { MetadataManagePage } from './pages/metadata-manage/metadata-manage.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: MetadataPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gescarmeta', permissionType: 'read' },
  },
  {
    path: 'manage',
    component: MetadataManagePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataRoutingModule { }
