import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeatailComponent } from './card-deatail.component';

describe('CardDeatailComponent', () => {
  let component: CardDeatailComponent;
  let fixture: ComponentFixture<CardDeatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDeatailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDeatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
