import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalAssistanceRoutingModule } from './technical-assistance-routing.module';
import { DocumentCatalogPage } from './pages/document-catalog/document-catalog.page';
import { DocumentManagePage } from './pages/document-manage/document-manage.page';
import { TutorialCatalogPage } from './pages/tutorial-catalog/tutorial-catalog.page';
import { TutorialManagePage } from './pages/tutorial-manage/tutorial-manage.page';
import { FaqManagePage } from './pages/faq-manage/faq-manage.page';
import { FaqPage } from './pages/faq/faq.page';
import { TutorialManageContainerComponent } from './components/tutorial-manage-container/tutorial-manage-container.component';
import { TutorialCatalogContainerComponent } from './components/tutorial-catalog-container/tutorial-catalog-container.component';
import { DocumentCatalogContainerComponent } from './components/document-catalog-container/document-catalog-container.component';
import { DocumentManageContainerComponent } from './components/document-manage-container/document-manage-container.component';
import { FaqManageContainerComponent } from './components/faq-manage-container/faq-manage-container.component';
import { FaqContainerComponent } from './components/faq-container/faq-container.component';


@NgModule({
  declarations: [
    DocumentCatalogPage,
    DocumentManagePage,
    TutorialCatalogPage,
    TutorialManagePage,
    FaqManagePage,
    FaqPage,
    TutorialManageContainerComponent,
    TutorialCatalogContainerComponent,
    DocumentCatalogContainerComponent,
    DocumentManageContainerComponent,
    FaqManageContainerComponent,
    FaqContainerComponent
  ],
  imports: [
    CommonModule,
    TechnicalAssistanceRoutingModule
  ]
})
export class TechnicalAssistanceModule { }
