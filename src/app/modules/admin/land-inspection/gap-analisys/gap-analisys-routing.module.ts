import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GapAnalisysMenuComponent } from './pages/gap-analisys-menu/gap-analisys-menu.component';
import { LandWithoutGeoreferencingComponent } from './pages/land-without-georeferencing/land-without-georeferencing.component';

const routes: Routes = [
    {
        path: '',
        component: GapAnalisysMenuComponent,
    },
    {
        path: 'landwithoutgeo',
        component: LandWithoutGeoreferencingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GapAnalisysRoutingModule {}
