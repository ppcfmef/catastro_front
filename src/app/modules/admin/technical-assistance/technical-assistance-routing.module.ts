import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentManagePage } from './pages/document-manage/document-manage.page';
import { DocumentCatalogPage } from './pages/document-catalog/document-catalog.page';
import { TutorialManagePage } from './pages/tutorial-manage/tutorial-manage.page';
import { TutorialCatalogPage } from './pages/tutorial-catalog/tutorial-catalog.page';
import { FaqManagePage } from './pages/faq-manage/faq-manage.page';
import { FaqPage } from './pages/faq/faq.page';

const routes: Routes = [
  {
    path: 'document',
    component: DocumentCatalogPage
  },
  {
    path: 'document-manage',
    component: DocumentManagePage
  },
  {
    path: 'tutorial',
    component: TutorialCatalogPage
  },
  {
    path: 'tutorial-manage',
    component: TutorialManagePage
  },
  {
    path: 'faq',
    component: FaqPage
  },
  {
    path: 'faq-manage',
    component: FaqManagePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalAssistanceRoutingModule { }
