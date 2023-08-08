import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTArancelPage } from './rtarancel.page';

describe('RTArancelPage', () => {
  let component: RTArancelPage;
  let fixture: ComponentFixture<RTArancelPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTArancelPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTArancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
