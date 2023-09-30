import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDoneComponent } from './ticket-done.component';

describe('TicketDoneComponent', () => {
  let component: TicketDoneComponent;
  let fixture: ComponentFixture<TicketDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
