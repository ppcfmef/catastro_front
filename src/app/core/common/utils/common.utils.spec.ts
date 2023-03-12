import {CommonUtils} from "./common.utils";
import {FormGroup} from '@angular/forms';

describe('UtilsClass', () => {
    it('should create', () => {
        const obj = {
            a: 1,
            null: null,
            'boolean': true
        };
        const form = new FormGroup({});
        expect(CommonUtils.generateRandomPassword()).toBeTruthy();
        expect(CommonUtils.deleteKeysNullInObject(obj)).toBeTruthy();
        expect(CommonUtils.setFormValues(form, obj)).toBeUndefined();
    });
});
