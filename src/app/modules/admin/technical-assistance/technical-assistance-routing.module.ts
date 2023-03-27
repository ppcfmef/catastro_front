import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentManagePage } from './pages/document-manage/document-manage.page';
import { DocumentCatalogPage } from './pages/document-catalog/document-catalog.page';
import { TutorialManagePage } from './pages/tutorial-manage/tutorial-manage.page';
import { TutorialCatalogPage } from './pages/tutorial-catalog/tutorial-catalog.page';
import { FaqManagePage } from './pages/faq-manage/faq-manage.page';
import { FaqPage } from './pages/faq/faq.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';

const routes: Routes = [
  {
    path: 'document',
    component: DocumentCatalogPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'asismanual', permissionType: 'read' },
  },
  {
    path: 'document-manage',
    component: DocumentManagePage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'asismanual', permissionType: 'edit' },
  },
  {
    path: 'tutorial',
    component: TutorialCatalogPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'asistutori', permissionType: 'read' },
  },
  {
    path: 'tutorial-manage',
    component: TutorialManagePage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'asistutori', permissionType: 'edit' },
  },
  {
    path: 'faq',
    component: FaqPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'asisfaq', permissionType: 'read' },
  },
  {
    path: 'faq-manage',
    component: FaqManagePage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'asisfaq', permissionType: 'edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalAssistanceRoutingModule { }
