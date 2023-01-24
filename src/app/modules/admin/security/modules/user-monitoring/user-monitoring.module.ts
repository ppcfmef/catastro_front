import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './containers/list/list.component';
import { UserMonitoringRouting } from './user-monitoring.routing';
import { UserMonitoringComponent } from './user-monitoring.component';
import { MatIconModule } from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DetailComponent } from './components/detail/detail.component';



@NgModule({
  declarations: [
    ListComponent,
    UserMonitoringComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    UserMonitoringRouting,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class UserMonitoringModule { }
