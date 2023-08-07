import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredialPage } from './predial.page';

describe('PredialPage', () => {
  let component: PredialPage;
  let fixture: ComponentFixture<PredialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredialPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
