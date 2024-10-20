import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

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
