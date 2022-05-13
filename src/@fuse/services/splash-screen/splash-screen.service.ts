import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class FuseSplashScreenService
{
    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _router: Router
    )
    {
        // Hide it on the first NavigationEnd event
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                this.hide();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the splash screen
     */
    show(opacityBg = 1): void
    {
        this._document.body.classList.remove('fuse-splash-screen-hidden');
        if(opacityBg === 0){
            this._document.body.classList.add('opacityBg-fuse-splash-screen');
        }
    }

    /**
     * Hide the splash screen
     */
    hide(): void
    {
        this._document.body.classList.add('fuse-splash-screen-hidden');
    }
}
