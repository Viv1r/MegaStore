import {Observable} from "rxjs";
import {EventEmitter} from "@angular/core";

export interface PopupFormItem {
    id?: number,
    source?: Observable<any>,
    constructor: any,
    emitter: EventEmitter<any>
}
