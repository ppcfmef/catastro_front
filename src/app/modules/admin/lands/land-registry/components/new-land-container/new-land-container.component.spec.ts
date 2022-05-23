import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLandContainerComponent } from './new-land-container.component';

describe('NewLandContainerComponent', () => {
  let component: NewLandContainerComponent;
  let fixture: ComponentFixture<NewLandContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLandContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
