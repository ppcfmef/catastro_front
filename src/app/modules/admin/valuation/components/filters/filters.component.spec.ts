import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { RouterModule } from '@angular/router';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      declarations: [ FiltersComponent ],
      providers: [FuseSplashScreenService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test', () => {
    component.params = {
        department: '14',
        province: '01',
        district: '01',
        namedistrict: '',
        projection: 0,
        fileToUpload: null
    };
    expect(component.initParams()).toBeUndefined();
    expect(component.selectDep()).toBeUndefined();
    expect(component.selectProv()).toBeUndefined();
    expect(component.selectDist()).toBeUndefined();
    expect(component.buscar()).toBeUndefined();
    expect(component.descargar()).toBeUndefined();
    expect(component.subirDato()).toBeUndefined();
  });
});
