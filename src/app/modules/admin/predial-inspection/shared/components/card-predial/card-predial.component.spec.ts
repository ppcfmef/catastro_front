import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPredialComponent } from './card-predial.component';

describe('CardPredialComponent', () => {
  let component: CardPredialComponent;
  let fixture: ComponentFixture<CardPredialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPredialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPredialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
