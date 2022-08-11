import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import { BasicMappingPage } from './pages/basic-mapping/basic-mapping.page';

@NgModule({
    declarations: [
        MappingComponent,
        BasicMappingPage,
    ],
    imports: [
        CommonModule,
        MappingRoutingModule,
        MatSidenavModule,
    ]
})
export class MappingModule {
}
