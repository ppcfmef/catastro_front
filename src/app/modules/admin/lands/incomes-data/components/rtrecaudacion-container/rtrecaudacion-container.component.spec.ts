import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTRecaudacionContainerComponent } from './rtrecaudacion-container.component';

describe('RTRecaudacionContainerComponent', () => {
  let component: RTRecaudacionContainerComponent;
  let fixture: ComponentFixture<RTRecaudacionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTRecaudacionContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTRecaudacionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
