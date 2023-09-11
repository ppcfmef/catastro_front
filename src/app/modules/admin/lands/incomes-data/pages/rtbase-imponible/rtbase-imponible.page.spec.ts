import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTBaseImponiblePage } from './rtbase-imponible.page';

describe('RTBaseImponiblePage', () => {
  let component: RTBaseImponiblePage;
  let fixture: ComponentFixture<RTBaseImponiblePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTBaseImponiblePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTBaseImponiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
