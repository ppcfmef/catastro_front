import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConsistencyPage } from './upload-consistency.page';

describe('UploadConsistencyPage', () => {
  let component: UploadConsistencyPage;
  let fixture: ComponentFixture<UploadConsistencyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadConsistencyPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadConsistencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
