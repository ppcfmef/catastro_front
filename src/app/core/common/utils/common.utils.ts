import {UntypedFormGroup} from '@angular/forms';

export class CommonUtils {
    static generateRandomPassword(): string {
        return Math.random().toString(36).slice(-12);
    }

    static setFormValues(form: UntypedFormGroup, values: any, keyExcludedEmitEvent?: string, emitEvent = false): void {
        const rawValue = form.getRawValue();
        Object.keys(rawValue).forEach((key) => {
            if (values && values[key] || typeof values[key] === 'boolean') {
                form.get(key).patchValue(values[key], {
                    onlySelf: true,
                    emitEvent: key !== keyExcludedEmitEvent || emitEvent
                });
                return;
            }
            form.get(key).reset(typeof rawValue[key] === 'object' ? rawValue[key] : null, {emitEvent: false});
        });
    }

    static deleteKeysNullInObject(rawValue): any {
        Object.keys(rawValue).forEach((key) => {
            if (rawValue[key] === null || rawValue[key] === undefined || rawValue[key] === '') {
                delete rawValue[key];
            }
        });
        return rawValue;
    }

    static generateWhereArgis(params): string {
        let where ='';
        let i: number =0;
        Object.keys(params).forEach((key) => {
            if (!(params[key] === null || params[key] === undefined || params[key] === '')) {
                //delete rawValue[key];

                const data = typeof params[key] === 'string' ? `like '%${params[key].toUpperCase()}%'`: `= ${params[key]}`;
                where = i>0? `${where} AND ${key}  ${data}`:`${key}  ${data}`;
                i =i +1;
          }
        });
        return where;
    }
}
