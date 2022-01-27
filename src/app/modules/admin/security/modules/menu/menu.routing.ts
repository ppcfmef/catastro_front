import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './menu.component';
import {ListComponent} from './containers/list/list.component';

const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
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
export class MenuRouting {
}
