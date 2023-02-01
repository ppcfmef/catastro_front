import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NewOwnerLandPage } from './new-owner-land.page';

describe('NewOwnerLandPage', () => {
  let component: NewOwnerLandPage;
  let fixture: ComponentFixture<NewOwnerLandPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOwnerLandPage ]      ,
      imports:[
        HttpClientModule,],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOwnerLandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
