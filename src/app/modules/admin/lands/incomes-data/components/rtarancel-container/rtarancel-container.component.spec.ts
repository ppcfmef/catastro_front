import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTArancelContainerComponent } from './rtarancel-container.component';

describe('RTArancelContainerComponent', () => {
  let component: RTArancelContainerComponent;
  let fixture: ComponentFixture<RTArancelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTArancelContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTArancelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
