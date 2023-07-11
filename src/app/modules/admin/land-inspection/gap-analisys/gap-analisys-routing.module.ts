import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GapAnalisysMenuComponent } from './pages/gap-analisys-menu/gap-analisys-menu.component';

const routes: Routes = [
    {
        path: '',
        component: GapAnalisysMenuComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GapAnalisysRoutingModule {}
