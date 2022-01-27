import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesComponent} from './roles.component';
import {ListComponent} from './containers/list/list.component';

const routes: Routes = [
    {
        path: '',
        component: RolesComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'list'},
            {path: 'list', component: ListComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRouting {
}
