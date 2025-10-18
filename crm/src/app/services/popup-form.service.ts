import {EventEmitter, Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {PopupFormItem} from "../models/popup-form-item";

@Injectable({
    providedIn: 'root'
})
export class PopupFormService {

    applyItem$?: Subject<any>;

    readonly active$ = new BehaviorSubject<boolean>(false);

    readonly itemChange$ = new Subject<any>();
    readonly constructorChange$ = new Subject<any>();
    readonly close$ = new Subject<void>();
    readonly error$ = new Subject<string>();

    readonly popupFormItem$ = new BehaviorSubject<PopupFormItem | null>(null);

    clear(): void {
        this.popupFormItem$.next(null);
        this.close$.next();
    }

    apply(data: any): void {
        if (this.applyItem$) {
            const id = this.popupFormItem$.value?.id;
            this.applyItem$.next({id, item: data});
        }
    }

    pushError(errorMessage: string): void {
        this.error$.next(errorMessage);
    }

    load(item: PopupFormItem): void {
        this.popupFormItem$.next(item);
        this.applyItem$ = item.emitter; // Привязка внешнего эмиттера для последующей отправки данных

        if (item?.source) {
            item.source.subscribe((data: any) => {
                if (data.item) {
                    this.constructorChange$.next(item.constructor);
                    this.itemChange$.next(data.item);
                }
                this.active$.next(true);
            });
        } else {
            this.constructorChange$.next(item.constructor);
            this.active$.next(true);
        }
    }
}
