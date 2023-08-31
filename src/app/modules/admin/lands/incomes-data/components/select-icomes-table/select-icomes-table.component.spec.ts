import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIcomesTableComponent } from './select-icomes-table.component';

describe('SelectIcomesTableComponent', () => {
  let component: SelectIcomesTableComponent;
  let fixture: ComponentFixture<SelectIcomesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIcomesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIcomesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
