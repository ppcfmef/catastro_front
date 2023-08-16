import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPendingComponent } from './ticket-pending.component';

describe('TicketPendingComponent', () => {
  let component: TicketPendingComponent;
  let fixture: ComponentFixture<TicketPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
