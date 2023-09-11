import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTDeudaPage } from './rtdeuda.page';

describe('RTDeudaPage', () => {
  let component: RTDeudaPage;
  let fixture: ComponentFixture<RTDeudaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTDeudaPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTDeudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
