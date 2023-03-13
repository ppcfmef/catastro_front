import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { loadModules } from 'esri-loader';

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

  it('should functions', async () => {
    const [
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Map,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MapView,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Graphic,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        GraphicsLayer,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MapImageLayer,
    ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/layers/MapImageLayer',
    ]);
    expect(component.initializeMap()).toBeTruthy();
    expect(component.downloadPDF()).toBeTruthy();
    expect(component.addPoints([
        {
            latitude: -12.046374,
            longitude: -77.042793
        },
        {
            latitude: -12.786389,
            longitude: -74.975555
        }
    ])).toBeTruthy();
    const mapProperties = {
        basemap: 'streets-vector',
    };
    component.view = new MapView();
    expect(component.takeFhoto()).toBeUndefined();
  });
});
