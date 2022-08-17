import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataManagePage } from './metadata-manage.page';

describe('MetadataManagePage', () => {
  let component: MetadataManagePage;
  let fixture: ComponentFixture<MetadataManagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataManagePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
