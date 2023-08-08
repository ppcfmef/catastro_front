import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTMarcoPredioPage } from './rtmarco-predio.page';

describe('RTMarcoPredioPage', () => {
  let component: RTMarcoPredioPage;
  let fixture: ComponentFixture<RTMarcoPredioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTMarcoPredioPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTMarcoPredioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
