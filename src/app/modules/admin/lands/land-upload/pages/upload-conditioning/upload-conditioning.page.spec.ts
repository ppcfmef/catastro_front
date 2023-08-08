import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConditioningPage } from './upload-conditioning.page';

describe('UploadConditioningPage', () => {
  let component: UploadConditioningPage;
  let fixture: ComponentFixture<UploadConditioningPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadConditioningPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadConditioningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
