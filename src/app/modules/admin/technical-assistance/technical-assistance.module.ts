import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalAssistanceRoutingModule } from './technical-assistance-routing.module';
import { DocumentCatalogPage } from './pages/document-catalog/document-catalog.page';
import { DocumentManagePage } from './pages/document-manage/document-manage.page';
import { TutorialCatalogPage } from './pages/tutorial-catalog/tutorial-catalog.page';
import { TutorialManagePage } from './pages/tutorial-manage/tutorial-manage.page';
import { FaqManagePage } from './pages/faq-manage/faq-manage.page';
import { FaqPage } from './pages/faq/faq.page';


@NgModule({
  declarations: [
    DocumentCatalogPage,
    DocumentManagePage,
    TutorialCatalogPage,
    TutorialManagePage,
    FaqManagePage,
    FaqPage
  ],
  imports: [
    CommonModule,
    TechnicalAssistanceRoutingModule
  ]
})
export class TechnicalAssistanceModule { }
