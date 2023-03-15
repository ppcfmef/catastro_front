import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchOwnerContainerComponent } from './search-owner-container.component';
import { landRecordItemMock } from '../../tests/mocks/land-record.mock';


describe('SearchOwnerContainerComponent', () => {
  let component: SearchOwnerContainerComponent;
  let fixture: ComponentFixture<SearchOwnerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ SearchOwnerContainerComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOwnerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show land Map should set record', () => {
    // Todo: use in output event call
    component.onShowLandsMap(landRecordItemMock);
    expect(component.landRecord).toEqual(landRecordItemMock);
  });
});
