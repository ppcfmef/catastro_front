import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { GapAnalysisPage } from './pages/gap-analysis/gap-analysis.page';
import { GapListComponent } from './containers/gap-list/gap-list.component';
import { GeoreferencingComponent } from './containers/georeferencing/georeferencing.component';
import { DataPropertyComponent } from './containers/data-property/data-property.component';
import { GrowthAppleComponent } from './containers/growth-apple/growth-apple.component';

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
            {path: 'geo/:id', component: DataPropertyComponent},
            {path: 'growth-apple', component: GrowthAppleComponent}
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GapAnalysisRoutingModule {}
