import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';

import { LandRegistryGeolocationComponent } from './land-registry-geolocation.component';

describe('LandRegistryGeolocationComponent', () => {
  let component: LandRegistryGeolocationComponent;
  let fixture: ComponentFixture<LandRegistryGeolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      declarations: [ LandRegistryGeolocationComponent ],
      providers: [CustomConfirmationService, FuseConfirmationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandRegistryGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
