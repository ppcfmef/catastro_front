import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLandContainerComponent } from './list-land-container.component';

describe('ListLandContainerComponent', () => {
  let component: ListLandContainerComponent;
  let fixture: ComponentFixture<ListLandContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLandContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
