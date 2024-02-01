import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
           // Abre una nueva pestaña con la ruta '/geovisor'
    if (target === '_blank') {
        window.open('/geovisor', '_blank');
      }
    }
}
