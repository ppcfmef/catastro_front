import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadhistoryListComponent } from './uploadhistory-list.component';

describe('UploadhistoryListComponent', () => {
  let component: UploadhistoryListComponent;
  let fixture: ComponentFixture<UploadhistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadhistoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadhistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
