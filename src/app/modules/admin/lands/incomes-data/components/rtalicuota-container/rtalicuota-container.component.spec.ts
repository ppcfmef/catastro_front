import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTAlicuotaContainerComponent } from './rtalicuota-container.component';

describe('RTAlicuotaContainerComponent', () => {
  let component: RTAlicuotaContainerComponent;
  let fixture: ComponentFixture<RTAlicuotaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTAlicuotaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTAlicuotaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
