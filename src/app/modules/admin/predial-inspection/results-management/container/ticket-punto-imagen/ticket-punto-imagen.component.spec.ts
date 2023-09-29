import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPuntoImagenComponent } from './ticket-punto-imagen.component';

describe('TicketPuntoImagenComponent', () => {
  let component: TicketPuntoImagenComponent;
  let fixture: ComponentFixture<TicketPuntoImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPuntoImagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPuntoImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
