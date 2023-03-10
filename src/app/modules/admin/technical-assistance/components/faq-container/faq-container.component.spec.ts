import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqService } from '../../services/faq.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FaqContainerComponent } from './faq-container.component';

describe('FaqContainerComponent', () => {
  let component: FaqContainerComponent;
  let fixture: ComponentFixture<FaqContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FaqContainerComponent ],
      providers: [FaqService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
