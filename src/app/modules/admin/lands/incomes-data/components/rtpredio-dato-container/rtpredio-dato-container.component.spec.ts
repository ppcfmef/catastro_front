import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTPredioDatoContainerComponent } from './rtpredio-dato-container.component';

describe('RTPredioDatoContainerComponent', () => {
  let component: RTPredioDatoContainerComponent;
  let fixture: ComponentFixture<RTPredioDatoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTPredioDatoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTPredioDatoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
