import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MappingComponent} from './mapping.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', component: MappingComponent},
    {
        path: 'geovisor',
        loadChildren: () => import('./geovisor/geovisor.module').then(m => m.GeovisorModule)
    }
];

@NgModule({
    declarations: [
        MappingComponent
    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        RouterModule.forChild(routes)
    ]
})
export class MappingModule {
}
