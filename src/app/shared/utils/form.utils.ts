import {HttpParams} from '@angular/common/http';

export class FormUtils {
    static parseToFormData(rawValue,extension: any= null): FormData {
        const formData = new FormData();
        for (const k in rawValue) {
            if (k) {
                if (typeof rawValue[k] === 'boolean') {
                    formData.append(k, `${(+rawValue[k])}`);
                } else if (rawValue[k] === 0) {
                    formData.append(k, `${(rawValue[k])}`);
                } else if (k === 'archivo' || k === 'file' || k === 'fileUpload' || k==='fileNotificacion') {
                    formData.append(k, rawValue[k], (extension && extension==='pdf') ? `${rawValue[k]?.name}.pdf`:rawValue[k]?.name );
                } else if (rawValue[k] !== '' && !!rawValue[k]) {
                    formData.append(k, rawValue[k]);
                }
            }
        }
        return formData;
    }


    static deleteKeysNullInObject(rawValue): any {
        Object.keys(rawValue).forEach((key) => {
            if (!rawValue[key]) {
                delete rawValue[key];
            }
        });
        return rawValue;
    }

    static buildQueryParams<T = any>(params: T): HttpParams {
        if (!params) {
            return;
        }
        let queryParams = new HttpParams();
        for (const key in params) {
            if (params[key] instanceof Array) {
                if ((params[key] as any).length) {
                    (params[key] as any).forEach((item) => {
                        queryParams = queryParams.append(key, item);
                    });
                }
            } else if (params[key]) {
                queryParams = queryParams.append(key, (params as any)[key]);
            }
        }
        return queryParams;
    }

    static zeroPad(num: number, places: number): string
        { return String(num).padStart(places, '0');
    }


}
