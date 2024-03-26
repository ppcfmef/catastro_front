import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLandOwnerComponent } from './alert-land-owner.component';

describe('AlertLandOwnerComponent', () => {
  let component: AlertLandOwnerComponent;
  let fixture: ComponentFixture<AlertLandOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertLandOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertLandOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
