import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    },
    {
        path: 'profile',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        loadChildren: () => import('app/modules/admin/account/profile/profile.module')
            .then(m => m.ProfileModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRouting {
}
