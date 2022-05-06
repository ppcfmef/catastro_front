import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { arcgisToGeoJSON  } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
//import * as shpwrite from 'shp-write';
declare let shpwrite: any;
import { saveAs } from 'file-saver';
import * as shp from 'shpjs';

import proj4 from 'proj4';
/*declare var Terraformer : any;*/
import { NgxSpinnerService } from 'ngx-spinner';
import { DistrictResource, Extension } from 'app/core/common/interfaces/common.interface';

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.scss']
})


export class ValuationComponent implements OnInit,AfterViewInit {
    constructor(
        ) {
        }

    ngAfterViewInit(): void {

    }

    ngOnInit(): void {

    }

}
