import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UploadhistoryListComponent } from './uploadhistory-list.component';
import { UploadhistoryService } from '../../services/uploadhistory.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('UploadhistoryListComponent', () => {
  let component: UploadhistoryListComponent;
  let fixture: ComponentFixture<UploadhistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadhistoryListComponent ],
      imports:[
        HttpClientModule,RouterTestingModule
      ],

      providers: [
        UploadhistoryService,]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadhistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
