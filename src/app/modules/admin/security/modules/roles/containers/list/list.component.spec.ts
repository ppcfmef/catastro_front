import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ListComponent} from '../list/list.component';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher/media-watcher.service';
import { FuseTailwindService } from '@fuse/services/tailwind/tailwind.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { MatDialogModule } from '@angular/material/dialog';

import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, MatDialogModule, RouterModule.forRoot([])],
      declarations: [ ListComponent ],
      providers: [UntypedFormBuilder, FuseMediaWatcherService, FuseTailwindService, FuseConfirmationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
