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
import {
    DocumentCatalogListComponent
} from './components/document-catalog-container/document-catalog-list/document-catalog-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {DocumentCatalogService} from './services/document-catalog.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DocumentCatalogFilterComponent } from './components/document-catalog-filter/document-catalog-filter.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { TutorialItemComponent } from './components/tutorial-catalog-container/tutorial-item/tutorial-item.component';
import { TutorialService } from './services/tutorial.service';
import { FaqService } from './services/faq.service';
import { QuestionAnswerComponent } from './components/faq-container/question-answer/question-answer.component';

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
    FaqContainerComponent,
    DocumentCatalogListComponent,
    DocumentCatalogFilterComponent,
    TutorialItemComponent,
    QuestionAnswerComponent,
  ],
  imports: [
    CommonModule,
    TechnicalAssistanceRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    DocumentCatalogService,
    TutorialService,
    FaqService,
  ]
})
export class TechnicalAssistanceModule { }
