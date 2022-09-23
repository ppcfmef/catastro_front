import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementUploadRoutingModule } from './management-upload-routing.module';

//import { GeovisorComponent } from './pages/geovisor/geovisor.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ManagementUploadPage } from './management-upload.page';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    ManagementUploadPage
    //GeovisorComponent,
  ],
  imports: [
    CommonModule,
    ManagementUploadRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule
  ]
})
export class ManagementUploadModule { }
