import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { GapAnalysisPage } from './pages/gap-analysis/gap-analysis.page';
import { GapListComponent } from './containers/gap-list/gap-list.component';
import { GeoreferencingComponent } from './containers/georeferencing/georeferencing.component';
import { DataPropertyComponent } from './containers/data-property/data-property.component';
import { ImagenComponent } from './containers/imagen/imagen.component';
import { WithoutBatchComponent } from './containers/block-without-batch/without-batch.component';
import { SubLandComponent } from './containers/sub-land/sub-land.component';
import { PointsWithoutLandComponent } from './containers/points-without-land/points-without-land.component';
import { GrowingBlockComponent } from './containers/growing-block/growing-block.component';

const routes: Routes = [
    {
        path: '',
        component: GapAnalysisPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gescarmeta', permissionType: 'read' },
        children: [
            { path: '', component:GapListComponent},
            { path: 'gap-list', component:GapListComponent},
            {path: 'geo',component: GeoreferencingComponent},
            {path: 'geo/land', component: DataPropertyComponent},
            {path: 'growing-block', component: GrowingBlockComponent},
            {path: 'imagen', component: ImagenComponent},
            {path: 'without-batch', component: WithoutBatchComponent},
            {path: 'sub-land', component: SubLandComponent},
            {path: 'points-without-land', component: PointsWithoutLandComponent},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GapAnalysisRoutingModule {}
