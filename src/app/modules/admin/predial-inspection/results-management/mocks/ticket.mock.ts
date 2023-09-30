import { ITicket } from "../interfaces/ticket.interface";
import {ubicacionMocks} from "../mocks/ubicacion.mock";
export const ticketsMock: ITicket []=[
    {    id: 1,
        obsTicketUsuario: '',
        codEstTrabajoTicket: 4,
        codUsuario: 63,
        fecInicioTrabajo: '0709230100',
        fecAsignacion: '0709230100',
        fecUltimaActualizacion: '0709230100',
        codEstEnvioTicket: 0,
        codTicket: 'G04070300001001',
        codTipoTicket: 2,
        obsTicketGabinete: '',
        ubicacion:null
    }
]


export const ticketMock: ITicket []=[
    {    id: 1,
        obsTicketUsuario: '',
        codEstTrabajoTicket: 4,
        codUsuario: 63,
        fecInicioTrabajo: '0709230100',
        fecAsignacion: '0709230100',
        fecUltimaActualizacion: '0709230100',
        codEstEnvioTicket: 0,
        codTicket: 'G04070300001001',
        codTipoTicket: 2,
        obsTicketGabinete: '',
        ubicacion:ubicacionMocks
    }
]