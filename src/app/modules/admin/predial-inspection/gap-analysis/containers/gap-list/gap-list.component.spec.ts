import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapListComponent } from './gap-list.component';

describe('GapListComponent', () => {
  let component: GapListComponent;
  let fixture: ComponentFixture<GapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
