import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';

import { TutorialCatalogContainerComponent } from './tutorial-catalog-container.component';
import { TutorialService } from '../../services/tutorial.service';

describe('TutorialCatalogContainerComponent', () => {
  let component: TutorialCatalogContainerComponent;
  let fixture: ComponentFixture<TutorialCatalogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TutorialCatalogContainerComponent, MatPaginator ],
      providers: [TutorialService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialCatalogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
