import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormBuilder, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { OwnerLandCreateAndEditComponent } from './owner-land-create-and-edit.component';

describe('OwnerLandCreateAndEditComponent', () => {
  let component: OwnerLandCreateAndEditComponent;
  let fixture: ComponentFixture<OwnerLandCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, MatDialogModule],
      declarations: [ OwnerLandCreateAndEditComponent ],
      providers: [UntypedFormBuilder, CustomConfirmationService, FuseSplashScreenService, FuseConfirmationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerLandCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
