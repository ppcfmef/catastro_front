import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { UserMonitoringComponent } from './user-monitoring.component';


const routes: Routes = [
    {
        path: '',
        component: UserMonitoringComponent,
        children: [
            {
                path: '',
                component: ListComponent,
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
