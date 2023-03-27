import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadHistoryPage } from './pages/upload-history/upload-history.page';
import { UploadNewPage } from './pages/upload-new/upload-new.page';
import { UploadDetailPage } from './pages/upload-detail/upload-detail.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';


const routes: Routes = [
  {
    path: 'new',
    component: UploadNewPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gprpnewupl', permissionType: 'read' },
  },
  {
    path: 'history',
    component: UploadHistoryPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gprphistor', permissionType: 'read' },
  },
  {
    path: 'history/:uploadHistoryId',
    component: UploadNewPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gprphistor', permissionType: 'edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandUploadRoutingModule { }
