import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { RouterTestingModule } from '@angular/router/testing';


import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule, MatSnackBarModule, RouterTestingModule ],
      declarations: [ MapComponent ],
      providers: [FuseSplashScreenService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.initializeMap()).toBeTruthy();
    expect(component.zoomToUbigeo("140101")).toBeTruthy();
    component.descargar({namedistrict: "Lima", projection: 1, district: "140101"});
    component.downloadFile("", "application/pdf", "test.pdf", false);
    component.createArcgisJSON([]);
    //component.cargar();
    // expect(component.buscar({district: "140101"})).toBeUndefined();
  });
});
