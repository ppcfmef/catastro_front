import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { LandRegistryService } from '../../services/land-registry.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LandRegistryGeolocationComponent } from './land-registry-geolocation.component';
import { MatDialogModule , MatDialogRef, MatDialog} from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
describe('LandRegistryGeolocationComponent', () => {
  let component: LandRegistryGeolocationComponent;
  let fixture: ComponentFixture<LandRegistryGeolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandRegistryGeolocationComponent ],
      imports:[
        HttpClientModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule,
    MatProgressSpinnerModule,
    ],
      providers: [
        UserService,
        CommonService,
        LandRegistryMapService ,
        {
            provide: MatDialogRef,
            useValue: {}
          },

        MessageProviderService,

        LandRegistryService ,
        FuseConfirmationService,
        CustomConfirmationService
    ]
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
