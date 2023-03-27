import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { UserMonitoringComponent } from './user-monitoring.component';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';

const routes: Routes = [
    {
        path: '',
        component: UserMonitoringComponent,
        children: [
            {
                path: '',
                component: ListComponent,
                canActivate: [NavigationAuthorizationGuard],
                data: { id: 'monuser', permissionType: 'read' },
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserMonitoringRouting {
}
