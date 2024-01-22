import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { SearchOwnerTableComponent } from './search-owner-table.component';

describe('SearchOwnerTableComponent', () => {
    let component: SearchOwnerTableComponent;
    let fixture: ComponentFixture<SearchOwnerTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatSortModule],
            declarations: [SearchOwnerTableComponent, MatPaginator, MatSort]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchOwnerTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
