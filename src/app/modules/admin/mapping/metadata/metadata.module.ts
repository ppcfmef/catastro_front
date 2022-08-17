import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataRoutingModule } from './metadata-routing.module';
import { MetadataPage } from './pages/metadata/metadata.page';
import { MetadataManagePage } from './pages/metadata-manage/metadata-manage.page';
import { MetadataContainerComponent } from './components/metadata-container/metadata-container.component';
import { MetadataManageContainerComponent } from './components/metadata-manage-container/metadata-manage-container.component';


@NgModule({
  declarations: [
    MetadataPage,
    MetadataManagePage,
    MetadataContainerComponent,
    MetadataManageContainerComponent
  ],
  imports: [
    CommonModule,
    MetadataRoutingModule
  ]
})
export class MetadataModule { }
