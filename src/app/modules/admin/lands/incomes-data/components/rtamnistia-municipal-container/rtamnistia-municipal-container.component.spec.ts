import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTAmnistiaMunicipalContainerComponent } from './rtamnistia-municipal-container.component';

describe('RTAmnistiaMunicipalContainerComponent', () => {
  let component: RTAmnistiaMunicipalContainerComponent;
  let fixture: ComponentFixture<RTAmnistiaMunicipalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTAmnistiaMunicipalContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTAmnistiaMunicipalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
