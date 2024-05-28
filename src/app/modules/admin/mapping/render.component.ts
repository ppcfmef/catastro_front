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
        const target = this.route.snapshot.data['target'] || '_self';
        this.router.navigate(['/'], { relativeTo: this.route });
        const redirect = `${environment.redirect}/geovisor`.trim();
        window.open(redirect, '_blank');
    }
}
