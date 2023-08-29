import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowingBlockComponent } from './growing-block.component';

describe('GrowingBlockComponent', () => {
  let component: GrowingBlockComponent;
  let fixture: ComponentFixture<GrowingBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowingBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
