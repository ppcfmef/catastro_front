import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';

import { UploadhistoryListComponent } from './uploadhistory-list.component';

describe('UploadhistoryListComponent', () => {
  let component: UploadhistoryListComponent;
  let fixture: ComponentFixture<UploadhistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ UploadhistoryListComponent, MatPaginator ]
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
