import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTPredioCaracteristicaPage } from './rtpredio-caracteristica.page';

describe('RTPredioCaracteristicaPage', () => {
  let component: RTPredioCaracteristicaPage;
  let fixture: ComponentFixture<RTPredioCaracteristicaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTPredioCaracteristicaPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTPredioCaracteristicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
