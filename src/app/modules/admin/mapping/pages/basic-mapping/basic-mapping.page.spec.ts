import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicMappingPage } from './basic-mapping.page';

describe('BasicMappingPage', () => {
  let component: BasicMappingPage;
  let fixture: ComponentFixture<BasicMappingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicMappingPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMappingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
