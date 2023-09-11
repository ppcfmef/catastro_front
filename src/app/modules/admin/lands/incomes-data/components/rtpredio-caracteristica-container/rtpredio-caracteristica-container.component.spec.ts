import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTPredioCaracteristicaContainerComponent } from './rtpredio-caracteristica-container.component';

describe('RTPredioCaracteristicaContainerComponent', () => {
  let component: RTPredioCaracteristicaContainerComponent;
  let fixture: ComponentFixture<RTPredioCaracteristicaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTPredioCaracteristicaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTPredioCaracteristicaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
