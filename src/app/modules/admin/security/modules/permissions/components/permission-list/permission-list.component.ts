import {map} from 'rxjs/operators';
import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {PermissionService} from 'app/shared/services/permission.service';
import {TypePermission} from 'app/shared/models/permission.interface';


@Component({
    selector: 'app-permission-list',
    templateUrl: './permission-list.component.html',
    styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit, OnChanges {

    @ViewChild(MatTable) recordsTable: MatTable<any>;

    @Input() permissions = [];

    typePermissions: TypePermission[] = [];
    columnsToDisplay: string[] = [];
    dataSource = new MatTableDataSource<any>();

    constructor(
        private _permissionService: PermissionService,
    ) {
    }

    ngOnInit(): void {}

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        this.columnsToDisplay = await this.getDisplayedColumns();
        this.dataSource.data = await this.getDataSource();
        if (changes.permissions.currentValue) {
            this.setValuesPermissionOfTable(this.permissions);
        }
    }

    setValuesPermissionOfTable(permissions = []): void {
        if (permissions?.length > 0) {
            permissions.forEach((permission) => {
                const dataSource = this.dataSource.data;
                const elementFound = dataSource.find((element: any) => element.id === permission.navigationView);
                elementFound[permission.type] = true;
            });
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


    updatePermission(permission, record): void {
        const genericPermission = permission.split('_')[0];

        for (const data of this.dataSource.data) {
            if(data?.id === record?.id) {
                for (const col of this.columnsToDisplay) {
                    if (col !== permission && col.startsWith(genericPermission)) {
                        data[col] = false;
                    }
                }
                break;
            }
        }
    }

    parsedResponse(): any {
        const parsedData = this.dataSource.data;
        let response = [];
        parsedData.forEach((element) => {
            const elementParsed = this.extractKeysToList(element);
            response = [...response, ...elementParsed];
        });
        return response;
    }

    extractKeysToList(element): any[] {
        const response = [];
        Object.keys(element).forEach((key: string) => {
            if (this.validateKeysToExtract(key) && element[key]) {
                const payload = {type: key, navigationView: element.id};
                response.push(payload);
            }
        });
        return response;
    }

    validateKeysToExtract(key: string): boolean {
        switch (key) {
            case 'id':
            case 'fullTitle':
            case 'module':
                return false;
            default:
                return true;
        }
    }

}
