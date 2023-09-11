import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTRecaudacionPage } from './rtrecaudacion.page';

describe('RTRecaudacionPage', () => {
  let component: RTRecaudacionPage;
  let fixture: ComponentFixture<RTRecaudacionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTRecaudacionPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTRecaudacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
