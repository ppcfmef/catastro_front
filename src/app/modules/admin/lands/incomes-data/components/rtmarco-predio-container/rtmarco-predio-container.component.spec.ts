import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTMarcoPredioContainerComponent } from './rtmarco-predio-container.component';

describe('RTMarcoPredioContainerComponent', () => {
  let component: RTMarcoPredioContainerComponent;
  let fixture: ComponentFixture<RTMarcoPredioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTMarcoPredioContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTMarcoPredioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
