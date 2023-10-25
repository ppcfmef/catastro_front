import { Component, Input, OnChanges, OnInit, Output, SimpleChanges ,EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from 'app/shared/enums/actions.enum';

import { LandUI } from '../../interfaces/land.interface';
import { LandMaintenanceFormComponent } from '../land-maintenance-form/land-maintenance-form.component';

@Component({
  selector: 'app-land-maintenance-table',
  templateUrl: './land-maintenance-table.component.html',
  styleUrls: ['./land-maintenance-table.component.scss']
})
export class LandMaintenanceTableComponent implements OnInit,OnChanges {
    @Input() isRemove: boolean=true;
    @Input() ubigeo: string ;
    @Input() typeAction: string= Actions.LEER;
    @Input() dataSource: LandUI[];
    @Output() dataSourceUpdateEvent: EventEmitter<LandUI[]> = new EventEmitter();
    leer=Actions.LEER;
    displayedColumns: string[] = ['nro','ubigeo', 'cpm', 'cup','idLote', 'habilitacionName','streetName','urbanMza','urbanLotNumber','creationDate','actions'];
    constructor(public dialog: MatDialog) {

     }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('changes>>',changes);
    /*if(changes && changes.idLand.currentValue){


     }*/
    }

    landSelection(land: LandUI): void{

        const dialogRef = this.dialog.open(LandMaintenanceFormComponent, {
            data: {land:land,action:this.typeAction,ubigeo :this.ubigeo},
            width: '600px',
            height:'100%'
          });

          if(this.typeAction===Actions.EDITAR){

            dialogRef.afterClosed().subscribe((result) => {
                console.log('result>>',result);
                //land={... result};

                Object.assign(land, result);
                //let landReplaced=this.dataSource.find(a=>a.id===land.id);
                //landReplaced=result;

                });

          }

    }


    removeSelection(land: LandUI): void{
        const index=this.dataSource.indexOf(land);
        if (land && index>-1){
            const data = [...this.dataSource];
            data.splice(index,1);
            this.dataSource = data;
            this.dataSourceUpdateEvent.emit(this.dataSource);

        }

    }
}
