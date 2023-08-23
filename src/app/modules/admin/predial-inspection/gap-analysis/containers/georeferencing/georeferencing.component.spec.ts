import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoreferencingComponent } from './georeferencing.component';

describe('GeoreferencingComponent', () => {
  let component: GeoreferencingComponent;
  let fixture: ComponentFixture<GeoreferencingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoreferencingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoreferencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
