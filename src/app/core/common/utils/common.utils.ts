import {FormGroup} from '@angular/forms';

export class CommonUtils {
    static generateRandomPassword(): string {
        return Math.random().toString(36).slice(-12);
    }

    static setFormValues(form: FormGroup, values: any, keyExcludedEmitEvent?: string, emitEvent = false): void {
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
}
