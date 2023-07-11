import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapAnalisysMenuComponent } from './gap-analisys-menu.component';

describe('GapAnalisysMenuComponent', () => {
  let component: GapAnalisysMenuComponent;
  let fixture: ComponentFixture<GapAnalisysMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapAnalisysMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GapAnalisysMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
