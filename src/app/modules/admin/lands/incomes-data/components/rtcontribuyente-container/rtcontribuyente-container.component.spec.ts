import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTContribuyenteContainerComponent } from './rtcontribuyente-container.component';

describe('RTContribuyenteContainerComponent', () => {
  let component: RTContribuyenteContainerComponent;
  let fixture: ComponentFixture<RTContribuyenteContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTContribuyenteContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTContribuyenteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
