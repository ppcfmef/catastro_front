import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisCatalogComponent } from './gis-catalog.component';

describe('GisCatalogComponent', () => {
    let component: GisCatalogComponent;
    let fixture: ComponentFixture<GisCatalogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GisCatalogComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GisCatalogComponent);
        component = fixture.componentInstance;
        component.catalog = {
            id: 1,
            title: "test catalog",
            category: 1,
            thumbnail: "thumb",
            description: ""
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
