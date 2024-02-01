import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { WidgetComponent } from './components/widget/widget.component';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
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
