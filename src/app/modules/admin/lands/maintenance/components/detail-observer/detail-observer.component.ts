import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ListApplicationMaintenancePage } from '../../pages/list-application-maintenance/list-application-maintenance.page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, pipe, switchMap, takeUntil } from 'rxjs';
import { DetailObservedService } from '../../services/detail-observed.service';
import { ResultObservation } from '../../interfaces/observation.interface';
import { Console } from 'console';

@Component({
    selector: 'detail-observer',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatTooltipModule,
    ],
    templateUrl: './detail-observer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailObserverComponent implements OnInit, OnDestroy{

    #unsubscribeAll: Subject<any> = new Subject<any>();
    observation: ResultObservation = {
        id: null,
        img: '',
        application: null,
        description: ''
    };

    isLoading: boolean = true;
    //inject services
    #listApplicationMaintenancePage = inject(ListApplicationMaintenancePage);
    #activeRouter = inject(ActivatedRoute);
    #detailObservedService = inject(DetailObservedService);
    #changeDetectorRef = inject(ChangeDetectorRef);

    ngOnInit(): void {
            // Open the drawer MaintenancePage.matDrawer.open();
            this.#listApplicationMaintenancePage.matDrawer.open();
            this.#activeRouter.params
                .pipe(takeUntil(this.#unsubscribeAll),
                 switchMap(({id}) => {
                        this.isLoading = true;
                        this.#changeDetectorRef.markForCheck();
                        return this.#detailObservedService.getObservation(id);
                    }))
                    .subscribe(
                    (response) => {
                        console.log(response, 'detail response');
                        this.observation = response[0];
                        this.isLoading = false;
                        this.#changeDetectorRef.markForCheck();
                    });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.#unsubscribeAll.next(null);
        this.#unsubscribeAll.complete();
        this.closeDrawer();
    }

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this.#listApplicationMaintenancePage.matDrawer.close();
    }
}
