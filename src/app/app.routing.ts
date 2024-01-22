/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {NoAuthGuard} from 'app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/security'
    {path: '', pathMatch: 'full', redirectTo: 'home'},

    // Redirect signed in user to the '/home'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'home'},

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
            },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            },
            {
                path: 'errors',
                loadChildren: () => import('app/modules/errors/errors.module').then(m => m.ErrorsModule)
            },
        ]
    },

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'account',
                loadChildren: () => import('app/modules/admin/account/account.module').then(m => m.AccountModule)
            },
            {
                path: 'home',
                loadChildren: () => import('app/modules/admin/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'security',
                loadChildren: () => import('app/modules/admin/security/security.module').then(m => m.SecurityModule)
            },
            {
                path: 'mapping',
                loadChildren: () => import('app/modules/admin/mapping/mapping.module').then(m => m.MappingModule)
            },
            {
                path: 'gesvalo',
               
                loadChildren: () => import('app/modules/admin/valuation/valuation.module').then(m => m.ValuationModule)
            },
            {
                path: 'land',
                loadChildren: () => import('app/modules/admin/lands/lands.module').then(m => m.LandsModule)
            },
            {
                path: 'land-inspection',
                loadChildren: () => import('./modules/admin/predial-inspection/predial-inspection.module').then(m => m.PredialInspectionModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('app/modules/admin/reports/reports.module').then(m => m.ReportsModule)
            },
            {
                path: 'technical-assistance',
                loadChildren: () => import('app/modules/admin/technical-assistance/technical-assistance.module').then(m => m.TechnicalAssistanceModule)
            },
        ]
    }
];
