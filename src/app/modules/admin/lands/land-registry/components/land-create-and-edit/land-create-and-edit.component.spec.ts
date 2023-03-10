import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { MatDialogModule } from '@angular/material/dialog';

import { LandCreateAndEditComponent } from './land-create-and-edit.component';

describe('LandCreateAndEditComponent', () => {
  let component: LandCreateAndEditComponent;
  let fixture: ComponentFixture<LandCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, MatDialogModule],
      declarations: [ LandCreateAndEditComponent ],
      providers: [FormBuilder, CustomConfirmationService, FuseConfirmationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
