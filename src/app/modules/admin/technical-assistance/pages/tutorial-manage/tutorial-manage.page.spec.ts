import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialManagePage } from './tutorial-manage.page';

describe('TutorialManagePage', () => {
  let component: TutorialManagePage;
  let fixture: ComponentFixture<TutorialManagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialManagePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
