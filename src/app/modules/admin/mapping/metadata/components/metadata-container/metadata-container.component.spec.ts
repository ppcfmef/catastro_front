import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MetadataContainerComponent } from './metadata-container.component';
import { GisMetadataService } from '../../services/gis-metadata.service';

describe('MetadataContainerComponent', () => {
  let component: MetadataContainerComponent;
  let fixture: ComponentFixture<MetadataContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataContainerComponent ],
      imports:[
        HttpClientModule,],
        providers: [
          GisMetadataService,]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
