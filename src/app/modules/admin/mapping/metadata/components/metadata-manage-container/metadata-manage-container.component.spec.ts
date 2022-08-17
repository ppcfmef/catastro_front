import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataManageContainerComponent } from './metadata-manage-container.component';

describe('MetadataManageContainerComponent', () => {
  let component: MetadataManageContainerComponent;
  let fixture: ComponentFixture<MetadataManageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataManageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataManageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
