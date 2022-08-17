import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialManageContainerComponent } from './tutorial-manage-container.component';

describe('TutorialManageContainerComponent', () => {
  let component: TutorialManageContainerComponent;
  let fixture: ComponentFixture<TutorialManageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialManageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialManageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
