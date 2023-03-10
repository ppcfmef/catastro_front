import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ListComponent} from '../list/list.component';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher/media-watcher.service';
import { FuseTailwindService } from '@fuse/services/tailwind/tailwind.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { MatDialogModule } from '@angular/material/dialog';

import { AddEditComponent } from './add-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, MatDialogModule, RouterModule.forRoot([])],
      declarations: [ AddEditComponent ],
      providers: [ListComponent, FormBuilder, FuseMediaWatcherService, FuseTailwindService, FuseConfirmationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
