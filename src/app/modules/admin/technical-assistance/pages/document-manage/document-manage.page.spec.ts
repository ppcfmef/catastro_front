import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagePage } from './document-manage.page';

describe('DocumentManagePage', () => {
  let component: DocumentManagePage;
  let fixture: ComponentFixture<DocumentManagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentManagePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
