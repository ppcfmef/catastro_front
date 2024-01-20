import {CommonUtils} from "./common.utils";
import {UntypedFormGroup} from '@angular/forms';

describe('UtilsClass', () => {
    it('should create', () => {
        const obj = {
            a: 1,
            null: null,
            'boolean': true
        };
        const form = new UntypedFormGroup({});
        expect(CommonUtils.generateRandomPassword()).toBeTruthy();
        expect(CommonUtils.deleteKeysNullInObject(obj)).toBeTruthy();
        expect(CommonUtils.setFormValues(form, obj)).toBeUndefined();
    });
});
