import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatErrorTableComponent } from './format-error-table.component';

describe('FormatErrorTableComponent', () => {
  let component: FormatErrorTableComponent;
  let fixture: ComponentFixture<FormatErrorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatErrorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatErrorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
