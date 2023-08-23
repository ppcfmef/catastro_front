import { TableAction } from '../enum/table-action.enum';

export interface TableActions<T = any> {
    action: TableAction;
    row: T;
}
