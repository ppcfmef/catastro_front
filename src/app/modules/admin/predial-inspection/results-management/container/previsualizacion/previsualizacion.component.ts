import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-previsualizacion',
  templateUrl: './previsualizacion.component.html',
  styleUrls: ['./previsualizacion.component.scss']
})
export class PrevisualizacionComponent implements OnInit {

    data= [
        {
        title:'Long. Frente',
        total:6
        },
        {
            title:'Arancel',
            total:45
        },
        {
            title:'Area Terreno',
            total:160
        },
        {
            title:'Predio',
            total:[2020,2021,2022],
        },
    ];


    dataSource =[
        { nivel:'Piso 1', materialpred:'Madera', estadoConserva:'Bueno', claPred:'Casa', aConst:'2022', cMuroColumna:'A',
            cTecho:'A', cPiso:'B', cPuertaVentana:'B', cRevestimiento:'C', cBano:'G', cElecttricidad:'G',aconstruida:'90'
        },
        { nivel:'Piso 2', materialpred:'Madera', estadoConserva:'Bueno', claPred:'Casa', aConst:'2023', cMuroColumna:'A',
        cTecho:'A', cPiso:'B', cPuertaVentana:'B', cRevestimiento:'C', cBano:'G', cElecttricidad:'G',aconstruida:'35'
        },

    ];

    tableColumns=[
        { matheaderdef:  'Nivel', matcolumndef:  'nivel', matcelldef:  'nivel' },
        { matheaderdef:  'Material pred', matcolumndef:  'materialpred', matcelldef:  'materialpred' },
        { matheaderdef:  'Estado conserva', matcolumndef:  'estadoConserva', matcelldef:  'estadoConserva' },
        { matheaderdef:  'Clasificación pred', matcolumndef:  'claPred', matcelldef:  'claPred' },
        { matheaderdef:  'Año construcción', matcolumndef:  'aConst', matcelldef:  'aConst' },
        { matheaderdef:  'C.Muro Columna', matcolumndef:  'cMuroColumna', matcelldef:  'cMuroColumna' },
        { matheaderdef:  'C.Techo', matcolumndef:  'cTecho', matcelldef:  'cTecho' },
        { matheaderdef:  'C.Piso', matcolumndef:  'cPiso', matcelldef:  'cPiso' },
        { matheaderdef:  'C.Puerta Ventana', matcolumndef:  'cPuertaVentana', matcelldef:  'cPuertaVentana' },
        { matheaderdef:  'C.Reves timiento', matcolumndef:  'cRevestimiento', matcelldef:  'cRevestimiento' },
        { matheaderdef:  'C.Baño', matcolumndef:  'cBano', matcelldef:  'cBano' },
        { matheaderdef:  'C.Elec tricidad', matcolumndef:  'cElecttricidad', matcelldef:  'cElecttricidad' },
        { matheaderdef:  'Area construida', matcolumndef:  'aconstruida', matcelldef:  'aconstruida' },
    ];


    dataSourceInst =[
        { codInst:'1', codTipoIns:'3', anoConst:'2022', estConserva:'Bueno', dim:'16'},
        { codInst:'2', codTipoIns:'3', anoConst:'2023', estConserva:'Bueno', dim:'16'},

    ];
    tableColumnsInst = [
        { matheaderdef:  'Cod_inst', matcolumndef:  'codInst', matcelldef:  'codInst' },
        { matheaderdef:  'cod_tipo_inst.', matcolumndef:'codTipoIns', matcelldef:'codTipoIns' },
        { matheaderdef:  'Año const.', matcolumndef:  'anoConst', matcelldef:  'anoConst' },
        { matheaderdef:  'Estado conserva', matcolumndef:  'estConserva', matcelldef:  'estConserva' },
        { matheaderdef:  'Dimensión', matcolumndef:  'dim', matcelldef:  'dim' },
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
