import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './menu.component';
import {ListComponent} from './containers/list/list.component';
import {AddEditComponent} from './containers/add-edit/add-edit.component';

const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {
                path: '',
                component: ListComponent,
                children: [
                    {path: 'add', component: AddEditComponent},
                    {path: ':id', component: AddEditComponent}
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRouting {
}
