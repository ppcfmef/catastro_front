import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalandComponent } from './dataland.component';

describe('DatalandComponent', () => {
  let component: DatalandComponent;
  let fixture: ComponentFixture<DatalandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatalandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
