import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqManageContainerComponent } from './faq-manage-container.component';

describe('FaqManageContainerComponent', () => {
  let component: FaqManageContainerComponent;
  let fixture: ComponentFixture<FaqManageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqManageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqManageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
