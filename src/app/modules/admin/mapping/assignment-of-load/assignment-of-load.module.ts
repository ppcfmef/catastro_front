import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentOfLoadPage } from './pages/assignment-of-load/assignment-of-load.page';
import { AssignmentOfLoadRoutingModule } from './assignment-of-load-routing.module';
import { AssignmentOfLoadContainerComponent } from './components/assignment-of-load-container/assignment-of-load-container.component';
import { IndicatorWidgetComponent } from './components/indicator-widget/indicator-widget.component';
import { LoadListComponent } from './components/load-list/load-list.component';
import { MapComponent } from './components/map/map.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    AssignmentOfLoadPage,
    AssignmentOfLoadContainerComponent,
    IndicatorWidgetComponent,
    LoadListComponent,
    MapComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AssignmentOfLoadRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
  ]
})
export class AssignmentOfLoadModule { }
