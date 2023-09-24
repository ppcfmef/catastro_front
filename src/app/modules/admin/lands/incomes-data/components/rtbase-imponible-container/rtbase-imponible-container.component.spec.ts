import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTBaseImponibleContainerComponent } from './rtbase-imponible-container.component';

describe('RTBaseImponibleContainerComponent', () => {
  let component: RTBaseImponibleContainerComponent;
  let fixture: ComponentFixture<RTBaseImponibleContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTBaseImponibleContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTBaseImponibleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
