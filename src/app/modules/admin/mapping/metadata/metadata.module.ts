import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataRoutingModule } from './metadata-routing.module';
import { MetadataPage } from './pages/metadata/metadata.page';
import { MetadataManagePage } from './pages/metadata-manage/metadata-manage.page';


@NgModule({
  declarations: [
    MetadataPage,
    MetadataManagePage
  ],
  imports: [
    CommonModule,
    MetadataRoutingModule
  ]
})
export class MetadataModule { }
