import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManageContainerComponent } from './document-manage-container.component';

describe('DocumentManageContainerComponent', () => {
  let component: DocumentManageContainerComponent;
  let fixture: ComponentFixture<DocumentManageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentManageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentManageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
