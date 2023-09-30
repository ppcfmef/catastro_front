import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPredioSubvaluadoComponent } from './ticket-predio-subvaluado.component';

describe('TicketPredioSubvaluadoComponent', () => {
  let component: TicketPredioSubvaluadoComponent;
  let fixture: ComponentFixture<TicketPredioSubvaluadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPredioSubvaluadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPredioSubvaluadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
