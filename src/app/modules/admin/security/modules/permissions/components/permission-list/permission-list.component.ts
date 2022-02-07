import {Component, OnInit} from '@angular/core';
import {PermissionService} from '../../../../../../../shared/services/permission.service';
import {map} from 'rxjs/operators';
import {TypePermission} from '../../../../../../../shared/models/permission.interface';

@Component({
    selector: 'app-permission-list',
    templateUrl: './permission-list.component.html',
    styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {

    typePermissions: TypePermission[] = [];
    columnsToDisplay: string[] = [];
    dataSource = [];

    constructor(
        private _permissionService: PermissionService,
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.columnsToDisplay = await this.getDisplayedColumns();
        this.dataSource = await this.getDataSource();
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
