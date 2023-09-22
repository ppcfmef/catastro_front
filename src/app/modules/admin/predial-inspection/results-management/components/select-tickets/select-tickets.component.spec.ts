import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTicketsComponent } from './select-tickets.component';

describe('SelectTicketsComponent', () => {
  let component: SelectTicketsComponent;
  let fixture: ComponentFixture<SelectTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
