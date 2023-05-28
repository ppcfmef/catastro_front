import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadHistoryPage } from './pages/upload-history/upload-history.page';
import { UploadNewPage } from './pages/upload-new/upload-new.page';
import { UploadDetailPage } from './pages/upload-detail/upload-detail.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { UploadConsistencyPage } from './pages/upload-consistency/upload-consistency.page';
import { UploadConditioningPage } from './pages/upload-conditioning/upload-conditioning.page';

const routes: Routes = [
  {
    path: 'new',
    component: UploadNewPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gprpnewupl', permissionType: 'read' },
  },
  {
    path: 'consistency',
    component: UploadConsistencyPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gprpconsis', permissionType: 'read' },
  },
  {
    path: 'conditioning',
    component: UploadConditioningPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gprpcondit', permissionType: 'read' },
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
