import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSupportComponent } from './upload-support.component';

describe('UploadSupportComponent', () => {
  let component: UploadSupportComponent;
  let fixture: ComponentFixture<UploadSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
