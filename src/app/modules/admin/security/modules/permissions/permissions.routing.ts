import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionsComponent} from './permissions.component';
import {AssignmentsComponent} from './containers/assignments/assignments.component';
import {ListComponent} from './containers/list/list.component';

const routes: Routes = [
    {
        path: '',
        component: PermissionsComponent,
        children: [
            {path: '', component: ListComponent},
            {path: 'add', component: AssignmentsComponent},
            {path: ':id', component: AssignmentsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PermissionsRouting {
}
