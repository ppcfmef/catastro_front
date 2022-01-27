import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {DetailItemComponent} from './containers/detail-item/detail-item.component';
import {MenuItemsComponent} from './containers/menu-items/menu-items.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { breadcrumb: 'Inicio' },
        children: [
            {
                path: '',
                component: MenuItemsComponent,
                data: { breadcrumb: 'Items' },
            },
            {
                path: 'items',
                component: DetailItemComponent,
                data: { breadcrumb: 'SubItems' },
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRouting {
}
