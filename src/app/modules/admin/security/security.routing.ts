import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    },
    {
        path: 'users',
        loadChildren: () => import('app/modules/admin/security/modules/users/users.module')
            .then(m => m.UsersModule)
    },
    {
        path: 'roles',
        loadChildren: () => import('app/modules/admin/security/modules/roles/roles.module')
            .then(m => m.RolesModule)
    },
    {
        path: 'menu',
        loadChildren: () => import('app/modules/admin/security/modules/menu/menu.module')
            .then(m => m.MenuModule)
    },
    {
        path: 'permissions',
        loadChildren: () => import('app/modules/admin/security/modules/permissions/permissions.module')
            .then(m => m.PermissionsModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRouting {
}
