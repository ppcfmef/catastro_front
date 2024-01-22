import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';

import { MetadataRoutingModule } from './metadata-routing.module';
import { MetadataPage } from './pages/metadata/metadata.page';
import { MetadataManagePage } from './pages/metadata-manage/metadata-manage.page';
import { MetadataContainerComponent } from './components/metadata-container/metadata-container.component';
import { MetadataManageContainerComponent } from './components/metadata-manage-container/metadata-manage-container.component';
import { GisCatalogComponent } from './components/metadata-container/gis-catalog/gis-catalog.component';
import { GisCatalogDetailComponent } from './components/metadata-container/gis-catalog-detail/gis-catalog-detail.component';


@NgModule({
  declarations: [
    MetadataPage,
    MetadataManagePage,
    MetadataContainerComponent,
    MetadataManageContainerComponent,
    GisCatalogComponent,
    GisCatalogDetailComponent
  ],
  imports: [
    CommonModule,
    MetadataRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class MetadataModule { }
