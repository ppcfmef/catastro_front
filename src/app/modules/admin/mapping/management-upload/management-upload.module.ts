import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementUploadRoutingModule } from './management-upload-routing.module';

//import { GeovisorComponent } from './pages/geovisor/geovisor.component';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
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
