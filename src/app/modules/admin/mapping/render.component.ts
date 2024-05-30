import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
@Component({
    selector: 'app-render',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: '',
})
export class RenderComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router
        ) {};
    ngOnInit(): void {
        this.router.navigate(['/'], { relativeTo: this.route });
           // Abre una nueva pestaña con la ruta '/geovisor'
        const redirect = `${environment.redirect}/geovisor`.trim();
        window.open(redirect, '_blank');
    }
}
