import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PermissionService} from '../../../../../../../shared/services/permission.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {NavigationView, TypePermission} from '../../../../../../../shared/models/permission.interface';
import {Observable, of} from 'rxjs';
import {MatTable, MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-permission-list',
    templateUrl: './permission-list.component.html',
    styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit, OnChanges {

    @Input() permissions = [];

    typePermissions: TypePermission[] = [];
    columnsToDisplay: string[] = [];
    dataSource = new MatTableDataSource<any>();

    constructor(
        private _permissionService: PermissionService,
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.columnsToDisplay = await this.getDisplayedColumns();
        this.dataSource.data = await this.getDataSource();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.permissions.currentValue) {
            console.log('permissions', this.permissions);
        }
    }

    async getDisplayedColumns(): Promise<string[]> {
        try {
            const displayedColumns = await this._permissionService.getTypePermissions().toPromise();
            this.typePermissions = [...[{code: 'module', description: 'Modulos'}], ...displayedColumns];
            return this.typePermissions.map(el => el.code);
        } catch (err) {
            return [];
        }
    }

    async getDataSource(): Promise<any> {
        try {
            const dataSource = await this._permissionService.getNavigationView()
                .pipe(map((response) => {
                    const results = [];
                    response.forEach((el) => {
                        const element = {} as any;
                        element.id = el.id;
                        element.fullTitle = el.fullTitle;
                        this.typePermissions.forEach((value: any) => {
                            element[value.code] = false;
                        });
                        results.push(element);
                    });
                    return results;
                })).toPromise();
            return dataSource;
        } catch (err) {
            return [];
        }
    }


    updatePermission(key, element): void {
        console.log(key, element[key]);
    }

}
