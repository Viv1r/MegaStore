import {FieldType} from "../../../models/field-type";
import {FormControl} from "@angular/forms";

export const getFormControlByType = (type: FieldType): FormControl => {
    switch (type) {
        case FieldType.NUMBER:
        case FieldType.SELECT_ONE:
            return new FormControl(0);
        case FieldType.TEXT:
        case FieldType.LONG_TEXT:
            return new FormControl('');
        case FieldType.SELECT_MULTIPLE:
            return new FormControl<number[]>([]);
        case FieldType.RANGE:
            return new FormControl({min: 0, max: 0});
        case FieldType.DICTIONARY:
            return new FormControl<any>({});
    }
    return new FormControl(null);
}
