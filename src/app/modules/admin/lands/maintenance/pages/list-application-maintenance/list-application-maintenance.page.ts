import { ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailObservedService } from '../../services/detail-observed.service';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher/media-watcher.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-application-maintenance',
  templateUrl: './list-application-maintenance.page.html',
  styleUrls: ['./list-application-maintenance.page.scss']
})
export class ListApplicationMaintenancePage implements OnInit {

  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  #unsubscribeAll: Subject<any> = new Subject<any>();
  mode: 'side' | 'over';
  
  //inject services
  #changeDetectorRef = inject(ChangeDetectorRef);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #fuseMediaWatcherService = inject(FuseMediaWatcherService)
  
  constructor() { }

  ngOnInit(): void {

    // Subscribe to MatDrawer opened change
    this.matDrawer.openedChange.subscribe((opened) => {
      if (!opened) {
        this.#changeDetectorRef.markForCheck();
      }
    });


    // Subscribe to media changes
    this.#fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode if the given breakpoint is active
        this.mode = matchingAliases.includes('lg') ? 'side': 'over';

        // Mark for check
        this.#changeDetectorRef.markForCheck();
      });
  }
  
  onBackdropClicked(): void {
    // Go back to the list
    this.#router.navigate(['./'], { relativeTo: this.#activatedRoute });

    // Mark for check
    this.#changeDetectorRef.markForCheck();
  }

  onAddApplication(): void {
    this.#router.navigate(['/land/maintenance/list']);
  }

}
