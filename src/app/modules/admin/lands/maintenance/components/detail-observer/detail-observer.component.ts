import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DetailObservedService } from '../../services/detail-observed.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ListApplicationMaintenancePage } from '../../pages/list-application-maintenance/list-application-maintenance.page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Component({
    selector: 'detail-observer',
    standalone: true,
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
export class DetailObserverComponent implements OnInit {
    
    #unsubscribeAll: Subject<any> = new Subject<any>();

    //inject services
    #listApplicationMaintenancePage = inject(ListApplicationMaintenancePage);
    #router = inject(Router);
    #activeRouter = inject(ActivatedRoute);

    ngOnInit(): void {
            // Open the drawer                                                          
            this.#listApplicationMaintenancePage.matDrawer.open();
            this.#activeRouter.params.subscribe(({id}) => console.log('id', id ))
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.#unsubscribeAll.next(null);
        this.closeDrawer();
    }
 
    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this.#listApplicationMaintenancePage.matDrawer.close();
    }
 }
