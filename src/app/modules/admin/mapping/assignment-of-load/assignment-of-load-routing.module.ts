import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentOfLoadPage } from './pages/assignment-of-load/assignment-of-load.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: AssignmentOfLoadPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gescarmeta', permissionType: 'read' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssignmentOfLoadRoutingModule { }
