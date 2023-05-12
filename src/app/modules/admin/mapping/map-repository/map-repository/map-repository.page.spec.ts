import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRepositoryPage } from './map-repository.page';

describe('MapRepositoryPage', () => {
  let component: MapRepositoryPage;
  let fixture: ComponentFixture<MapRepositoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRepositoryPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRepositoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
