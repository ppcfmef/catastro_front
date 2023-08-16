import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRejectedComponent } from './ticket-rejected.component';

describe('TicketRejectedComponent', () => {
  let component: TicketRejectedComponent;
  let fixture: ComponentFixture<TicketRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
