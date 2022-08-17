import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqManagePage } from './faq-manage.page';

describe('FaqManagePage', () => {
  let component: FaqManagePage;
  let fixture: ComponentFixture<FaqManagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqManagePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
