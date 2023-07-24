import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGapMenuItemComponent } from './card-gap-menu-item.component';

describe('CardGapMenuItemComponent', () => {
  let component: CardGapMenuItemComponent;
  let fixture: ComponentFixture<CardGapMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardGapMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGapMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
