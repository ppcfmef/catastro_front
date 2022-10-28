import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import {environment} from '../../../environments/environment';
import {FuseNavigationItem} from '../../../@fuse/components/navigation';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    private _apiUrl = environment.apiUrl;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
        return this._httpClient.get<FuseNavigationItem[]>(`${this._apiUrl}/common/navigation/`).pipe(
            map((navigation: FuseNavigationItem[]): Navigation => {
                this._navigation.next({default: navigation});
                return {default: navigation};
            })
        );
    }
}
