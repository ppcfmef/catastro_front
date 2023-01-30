import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { NewLandContainerComponent } from './new-land-container.component';
import { UserService } from 'app/core/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from 'app/core/common/services/common.service';
describe('NewLandContainerComponent', () => {
  let component: NewLandContainerComponent;
  let fixture: ComponentFixture<NewLandContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLandContainerComponent ],
      imports:[
        HttpClientModule,],
      providers: [
        CommonService,
        UserService,
        LandRegistryMapService ,
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
