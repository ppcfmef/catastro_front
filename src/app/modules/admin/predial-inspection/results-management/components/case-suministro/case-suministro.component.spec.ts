import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSuministroComponent } from './case-suministro.component';

describe('CaseSuministroComponent', () => {
  let component: CaseSuministroComponent;
  let fixture: ComponentFixture<CaseSuministroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseSuministroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSuministroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
