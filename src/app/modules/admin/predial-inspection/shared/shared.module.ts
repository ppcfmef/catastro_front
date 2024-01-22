import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { WidgetComponent } from './components/widget/widget.component';

import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import { CardPredialComponent } from './components/card-predial/card-predial.component';
import { RouterModule } from '@angular/router';
import { WidgetMainComponent } from './components/widget-main/widget-main.component';
import { MapComponent } from './components/map/map.component';
import { SharedModule as Shared } from 'app/shared/shared.module';



@NgModule({
    declarations: [TableComponent, WidgetComponent,CardPredialComponent, WidgetMainComponent,MapComponent],
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        Shared,

    ],
    exports: [TableComponent, WidgetComponent, CardPredialComponent,WidgetMainComponent,MapComponent],
})
export class SharedModule {}
