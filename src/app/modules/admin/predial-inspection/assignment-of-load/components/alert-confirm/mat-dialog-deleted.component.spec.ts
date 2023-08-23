import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogDeletedComponent } from './mat-dialog-deleted.component';

describe('MatDialogDeletedComponent', () => {
  let component: MatDialogDeletedComponent;
  let fixture: ComponentFixture<MatDialogDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDialogDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
