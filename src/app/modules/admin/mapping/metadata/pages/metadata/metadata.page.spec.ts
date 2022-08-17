import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataPage } from './metadata.page';

describe('MetadataPage', () => {
  let component: MetadataPage;
  let fixture: ComponentFixture<MetadataPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
