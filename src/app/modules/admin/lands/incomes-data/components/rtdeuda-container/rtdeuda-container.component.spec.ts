import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTDeudaContainerComponent } from './rtdeuda-container.component';

describe('RTDeudaContainerComponent', () => {
  let component: RTDeudaContainerComponent;
  let fixture: ComponentFixture<RTDeudaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTDeudaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTDeudaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
