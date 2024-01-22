import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { FormsModule } from '@angular/forms';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';

import { LandUploadRoutingModule } from './land-upload-routing.module';

import { UploadNewPage } from './pages/upload-new/upload-new.page';
import { UploadHistoryPage } from './pages/upload-history/upload-history.page';
import { UploadDetailPage } from './pages/upload-detail/upload-detail.page';
import { UploadhistoryListComponent } from './components/uploadhistory-list/uploadhistory-list.component';
import { UploadTableFilesComponent } from './components/upload-table-files/upload-table-files.component';
import { UploadContainerComponent } from './components/upload-container/upload-container.component';
import { FormatErrorTableComponent } from './components/format-error-table/format-error-table.component';
import { ConsistencyErrorTableComponent } from './components/consistency-error-table/consistency-error-table.component';
import { UploadConsistencyPage } from './pages/upload-consistency/upload-consistency.page';
import { UploadConditioningPage } from './pages/upload-conditioning/upload-conditioning.page';
import { ConditioningContainerComponent } from './components/conditioning-container/conditioning-container.component';
import { ConsistencyContainerComponent } from './components/consistency-container/consistency-container.component';

@NgModule({
  declarations: [
    UploadNewPage,
    UploadHistoryPage,
    UploadDetailPage,
    UploadhistoryListComponent,
    UploadTableFilesComponent,
    UploadContainerComponent,
    FormatErrorTableComponent,
    ConsistencyErrorTableComponent,
    UploadConsistencyPage,
    UploadConditioningPage,
    ConditioningContainerComponent,
    ConsistencyContainerComponent,
  ],
  imports: [
    CommonModule,
    LandUploadRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
  ]
})
export class LandUploadModule { }
