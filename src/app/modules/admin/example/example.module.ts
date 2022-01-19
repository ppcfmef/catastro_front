import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleComponent} from './example.component';
import {Router, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', component: ExampleComponent}
];

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class ExampleModule {
}
