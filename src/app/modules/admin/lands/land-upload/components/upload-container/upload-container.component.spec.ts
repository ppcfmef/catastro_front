import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';

import { UploadContainerComponent } from './upload-container.component';

describe('UploadContainerComponent', () => {
  let component: UploadContainerComponent;
  let fixture: ComponentFixture<UploadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatDialogModule, MatSnackBarModule, HttpClientTestingModule ],
      declarations: [ UploadContainerComponent ],
      providers: [FuseConfirmationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
