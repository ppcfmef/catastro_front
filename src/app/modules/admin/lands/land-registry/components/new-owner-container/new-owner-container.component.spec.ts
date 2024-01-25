import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { MatDialogModule } from '@angular/material/dialog';

import { NewOwnerContainerComponent } from './new-owner-container.component';

describe('NewOwnerContainerComponent', () => {
  let component: NewOwnerContainerComponent;
  let fixture: ComponentFixture<NewOwnerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [ NewOwnerContainerComponent ],
      providers: [CustomConfirmationService, FuseConfirmationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOwnerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
