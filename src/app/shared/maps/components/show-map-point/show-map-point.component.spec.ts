import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ShowMapPointComponent } from './show-map-point.component';

describe('ShowMapPointComponent', () => {
  let component: ShowMapPointComponent;
  let fixture: ComponentFixture<ShowMapPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ShowMapPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMapPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should functions', () => {
    expect(component.initializeMap()).toBeTruthy();
    expect(component.downloadPDF()).toBeTruthy();
  });
});
