import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTEmisionPage } from './rtemision.page';

describe('RTEmisionPage', () => {
  let component: RTEmisionPage;
  let fixture: ComponentFixture<RTEmisionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTEmisionPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTEmisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
