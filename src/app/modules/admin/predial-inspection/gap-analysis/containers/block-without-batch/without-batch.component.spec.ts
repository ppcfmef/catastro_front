import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutBatchComponent } from './without-batch.component';

describe('WithoutBatchComponent', () => {
  let component: WithoutBatchComponent;
  let fixture: ComponentFixture<WithoutBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
