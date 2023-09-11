import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTVaremMunicipalContainerComponent } from './rtvarem-municipal-container.component';

describe('RTVaremMunicipalContainerComponent', () => {
  let component: RTVaremMunicipalContainerComponent;
  let fixture: ComponentFixture<RTVaremMunicipalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTVaremMunicipalContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTVaremMunicipalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
