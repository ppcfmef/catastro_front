import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTEmisionContainerComponent } from './rtemision-container.component';

describe('RTEmisionContainerComponent', () => {
  let component: RTEmisionContainerComponent;
  let fixture: ComponentFixture<RTEmisionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTEmisionContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTEmisionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
