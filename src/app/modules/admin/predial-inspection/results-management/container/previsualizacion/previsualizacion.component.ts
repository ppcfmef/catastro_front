import {Component, inject, Inject, OnInit} from '@angular/core';
import { IFoto } from '../../interfaces/foto.interface';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { ITicket } from '../../interfaces/ticket.interface';
import { CheckTicketService } from '../../services/check-ticket.service';
import { RegistroTitularidadService } from '../../services/registro-titularidad.service';
@Component({selector: 'app-previsualizacion', templateUrl: './previsualizacion.component.html', styleUrls: ['./previsualizacion.component.scss']})
export class PrevisualizacionComponent implements OnInit {

    dataCaracteristicas = [
        {
            title: 'Long. Frente',
            total: 6
        }, {
            title: 'Arancel',
            total: 45
        }, {
            title: 'Area Terreno',
            total: 160
        }, {
            title: 'Predio',
            total: [2020, 2021, 2022]
        },
    ];


    dataEdificaciones: any[] = [
     /*   {
            nivel: 'Piso 1',
            materialpred: 'Madera',
            estadoConserva: 'Bueno',
            claPred: 'Casa',
            aConst: '2022',
            cMuroColumna: 'A',
            cTecho: 'A',
            cPiso: 'B',
            cPuertaVentana: 'B',
            cRevestimiento: 'C',
            cBano: 'G',
            cElecttricidad: 'G',
            aconstruida: '90'
        }, {
            nivel: 'Piso 2',
            materialpred: 'Madera',
            estadoConserva: 'Bueno',
            claPred: 'Casa',
            aConst: '2023',
            cMuroColumna: 'A',
            cTecho: 'A',
            cPiso: 'B',
            cPuertaVentana: 'B',
            cRevestimiento: 'C',
            cBano: 'G',
            cElecttricidad: 'G',
            aconstruida: '35'
        },
*/
    ];

    // tableColumns = [
    //     {
    //         matheaderdef: 'Nivel',
    //         matcolumndef: 'nivel',
    //         matcelldef: 'nivel'
    //     },
    //     {
    //         matheaderdef: 'Material pred',
    //         matcolumndef: 'materialpred',
    //         matcelldef: 'materialpred'
    //     },
    //     {
    //         matheaderdef: 'Estado conserva',
    //         matcolumndef: 'estadoConserva',
    //         matcelldef: 'estadoConserva'
    //     },
    //     {
    //         matheaderdef: 'Clasificación pred',
    //         matcolumndef: 'claPred',
    //         matcelldef: 'claPred'
    //     }, {
    //         matheaderdef: 'Año construcción',
    //         matcolumndef: 'aConst',
    //         matcelldef: 'aConst'
    //     }, {
    //         matheaderdef: 'C.Muro Columna',
    //         matcolumndef: 'cMuroColumna',
    //         matcelldef: 'cMuroColumna'
    //     }, {
    //         matheaderdef: 'C.Techo',
    //         matcolumndef: 'cTecho',
    //         matcelldef: 'cTecho'
    //     }, {
    //         matheaderdef: 'C.Piso',
    //         matcolumndef: 'cPiso',
    //         matcelldef: 'cPiso'
    //     }, {
    //         matheaderdef: 'C.Puerta Ventana',
    //         matcolumndef: 'cPuertaVentana',
    //         matcelldef: 'cPuertaVentana'
    //     }, {
    //         matheaderdef: 'C.Reves timiento',
    //         matcolumndef: 'cRevestimiento',
    //         matcelldef: 'cRevestimiento'
    //     }, {
    //         matheaderdef: 'C.Baño',
    //         matcolumndef: 'cBano',
    //         matcelldef: 'cBano'
    //     }, {
    //         matheaderdef: 'C.Elec tricidad',
    //         matcolumndef: 'cElecttricidad',
    //         matcelldef: 'cElecttricidad'
    //     }, {
    //         matheaderdef: 'Area construida',
    //         matcolumndef: 'aconstruida',
    //         matcelldef: 'aconstruida'
    //     },
    // ];
    dataSourceInstOrigen = [


    ];

    dataSourceInst: any= [];
    tableColumnsInst = [
        {
            matheaderdef: 'Número piso',
            matcolumndef: 'npiso',
            matcelldef: 'npiso'
        },
        {
            matheaderdef: 'Tipo de obra',
            matcolumndef: 'tobra',
            matcelldef: 'tobra'
        },
        {
            matheaderdef: 'Tipo de material.',
            matcolumndef: 'tmaterial',
            matcelldef: 'tmaterial'
        },
        {
            matheaderdef: 'Estado conservación',
            matcolumndef: 'estConserva',
            matcelldef: 'estConserva'
        },
        {
            matheaderdef: 'Año y Mes de Obra',
            matcolumndef: 'amesobra',
            matcelldef: 'amesobra'
        },
        {
            matheaderdef: 'Categoría',
            matcolumndef: 'categoria',
            matcelldef: 'categoria'
        },
        {
            matheaderdef: 'Cantidad',
            matcolumndef: 'cant',
            matcelldef: 'cant'
        },
        {
            matheaderdef: 'Metro redondeado',
            matcolumndef: 'mredon',
            matcelldef: 'mredon'
        },
        {
            matheaderdef: 'Total metrado',
            matcolumndef: 'tmert',
            matcelldef: 'tmert'
        },

    ];


    fotos: IFoto[]=[];
    //dataGabinete: IRegistroTitularidad;
    dataGabinete: any;
    dataCaracteristicasOrigen= [];
    dataEdificacionesOrigen =[];
    ticket: ITicket;

    checkTicketService = inject(CheckTicketService);
    registroTitularidadService= inject(RegistroTitularidadService);
    constructor(
        // public dialogRef: MatDialogRef < PrevisualizacionComponent >,
        // @Inject(MAT_DIALOG_DATA)public dataDialog: any,
        private _confirmationService: CustomConfirmationService,
        ) {}

    ngOnInit(): void {
        this.checkTicketService.dataTicket$.subscribe((data) => {
            console.log('datasssss', data);
            this.ticket = data.ticket;
            this.dataGabinete = data.registrosTitularidad;
            this.fotos = data.fotos ?? [];
            this.dataCaracteristicasOrigen = [
                {
                    title: 'Número de Partida',
                    total: this.dataGabinete?.predioPadron?.resolutionDocument?this.dataGabinete?.predioPadron?.resolutionDocument:'-'
                },
                {
                    title: 'Clase de uso',
                    total: this.dataGabinete?.predioPadron?.predioContribuyente[0]?.claseUsoNombre
                },
                {
                    title: 'SubClase de uso',
                    total: this.dataGabinete?.predioPadron?.predioContribuyente[0]?.subclaseUsoNombre
                },
                {
                    title: 'Uso del Predio',
                    total: this.dataGabinete?.predioPadron?.predioContribuyente[0]?.tipUsoPredioNombre
                },
                {
                    title: 'Area del Terreno',
                    total: this.dataGabinete?.predioPadron?.predioContribuyente[0]?.areaTerreno
                },
                {
                    title: 'Area común terreno',
                    total: this.dataGabinete?.predioPadron?.predioContribuyente[0]?.areaTotTerrComun
                },
                {
                    title: 'Cant. de hab. o aforo',
                    total: this.dataGabinete?.predioPadron?.predioContribuyente[0]?.cantidadHabitantes
                },
                // {
                //     title: 'Tipo de Predio',
                //     total: this.dataGabinete?.predioPadron?.tipoPredioNombre
                // }
            ];
            this.dataEdificacionesOrigen =    [
            //     {
            //     nivel: null,
            //     materialpred: null,
            //     estadoConserva: null,
            //     claPred: null,
            //     aConst: null,
            //     cMuroColumna: null,
            //     cTecho: null,
            //     cPiso: null,
            //     cPuertaVentana: null,
            //     cRevestimiento: null,
            //     cBano: null,
            //     cElecttricidad: null,
            //     aconstruida: null
            // }
            ] ;

            this.dataCaracteristicas = [
                {
                    title: 'Número de Partida',
                    total: this.dataGabinete?.predioPadron?.resolutionDocument ?? '-'
                },
                {
                    title: 'Clase de uso',
                    total: this.dataGabinete?.predioInspeccion?.claseUsoNombre
                },
                {
                    title: 'SubClase de uso',
                    total: this.dataGabinete?.predioInspeccion?.subclaseUsoNombre
                },
                {
                    title: 'Uso del Predio',
                    total: this.dataGabinete?.predioInspeccion?.tipoUsoNombre
                },
                {
                    title: 'Area del Terreno',
                    total: this.dataGabinete?.caracteristicas?.areaTerreno
                },
                // {
                //     title: 'Area común terreno',
                //     total: this.dataGabinete?.caracteristicas?.predioContribuyente[0]?.areaTotTerrComun
                // },
            ];

            const c =this.dataGabinete.caracteristicas;
            this.dataEdificaciones = [
                    {
                    nivel: 'Piso ' + c?.piso,
                    materialpred: c?.materialPred,
                    estadoConserva: c?.estadoConservaNombre,
                    claPred: c?.materialPredNombre,
                    aConst: c?.anioConstruccion,
                    cMuroColumna: c?.categoriaMuroColumna,
                    cTecho: c?.catergoriaTecho,
                    cPiso: c?.catergoriaPiso,
                    cPuertaVentana: c?.catergoriaPuertaVentana,
                    cRevestimiento: c?.categoriaRevestimiento,
                    cBano: c?.catergoriaBano,
                    cElecttricidad: c?.categoriaElectrica,
                    aconstruida: c?.areaConstruida
            }];

            this.dataSourceInst = this.dataGabinete.instalaciones.map(i => ({
                    codInst: i.codInst,
                    codTipoIns: i.codTipoInst,
                    anoConst: i.anioConstruccion,
                    estConserva: i.estadoConserva,
                    dim: i.dimension
                }));

            // });

            // this.dataSourceInst = [
            //     {
            //     npiso: '1',
            //     tobra: 'Edificación',
            //     tmaterial: 'Concreto',
            //     estConserva: 'Bueno',
            //     amesobra: '2021-06',
            //     categoria: 'Residencial',
            //     cant: 3,
            //     mredon: 120,
            //     tmert: 360
            //     },
            //     {
            //     npiso: '2',
            //     tobra: 'Ampliación',
            //     tmaterial: 'Madera',
            //     estConserva: 'Regular',
            //     amesobra: '2019-08',
            //     categoria: 'Comercial',
            //     cant: 2,
            //     mredon: 75,
            //     tmert: 150
            //     },
            //     {
            //     npiso: '3',
            //     tobra: 'Remodelación',
            //     tmaterial: 'Ladrillo',
            //     estConserva: 'Malo',
            //     amesobra: '2015-03',
            //     categoria: 'Industrial',
            //     cant: 4,
            //     mredon: 200,
            //     tmert: 800
            //     },
            //     {
            //     npiso: '4',
            //     tobra: 'Construcción Nueva',
            //     tmaterial: 'Acero',
            //     estConserva: 'Excelente',
            //     amesobra: '2022-12',
            //     categoria: 'Oficinas',
            //     cant: 5,
            //     mredon: 250,
            //     tmert: 1250
            //     },
            //     {
            //     npiso: '5',
            //     tobra: 'Demolición Parcial',
            //     tmaterial: 'Adobe',
            //     estConserva: 'Deficiente',
            //     amesobra: '2010-05',
            //     categoria: 'Educacional',
            //     cant: 1,
            //     mredon: 50,
            //     tmert: 50
            //     }
            // ];

        });

        // this.ticket = this.dataDialog.ticket;
        // this.dataGabinete = this.dataDialog.registrosTitularidad;
        // this.fotos = this.dataDialog.fotos?this.dataDialog.fotos:[];


    }

    onClickConfirmarPredio(e: any): void {
        const dialogRef = this._confirmationService.info(
            'Confirmar',
            'Esta seguro de confimar el predio?'
        );
        dialogRef
            .afterClosed()
            .toPromise()
            .then((option) => {
                if (option === 'confirmed') {
                    this.checkTicketService.resolverTicket$.next('confirmar');
                }

            });


    }

    onClickSubvaluarPredio(e: any): void {
        const dialogRef = this._confirmationService.info(
            'Subvaluar',
            'Esta seguro de subvaluar el predio?'
        );

        dialogRef
            .afterClosed()
            .toPromise()
            .then((option) => {
                if (option === 'confirmed') {
                    this.checkTicketService.resolverTicket$.next('subvaluar');
                }
            });

    }

    onClickCerrar(e: any): void {
        this.checkTicketService.checkTicket$.next(false);
    }

    // onClickConfirmarPredio(e: any): void {
    //     const dialogRef = this._confirmationService.info(
    //         'Confirmar',
    //         'Esta seguro de confimar el predio?'
    //     );

    //     dialogRef
    //         .afterClosed()
    //         .toPromise()
    //         .then((option) => {
    //             if (option === 'confirmed') {
    //                 this.dialogRef.close('confirmar');
    //             }

    //         });


    // }

    // onClickSubvaluarPredio(e: any): void {
    //     const dialogRef = this._confirmationService.info(
    //         'Subvaluar',
    //         'Esta seguro de subvaluar el predio?'
    //     );

    //     dialogRef
    //         .afterClosed()
    //         .toPromise()
    //         .then((option) => {
    //             if (option === 'confirmed') {
    //                 this.dialogRef.close('subvaluar');
    //         }

    //         });

    // }


}
