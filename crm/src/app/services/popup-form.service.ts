import {EventEmitter, Injectable} from '@angular/core';
import { FormGroup } from "@angular/forms";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupFormService {
  active = false;

  itemChange = new EventEmitter<any>();
  constructorChange = new EventEmitter<any>();
  close = new EventEmitter<void>();
  error = new EventEmitter<string>();

  applyItem?: EventEmitter<any>;
  itemID?: number;

  clear(): void {
    this.itemID = undefined;
    this.close.emit();
  }

  apply(data: any) {
    if (this.applyItem) {
      this.applyItem.emit({id: this.itemID, item: data});
    }
  }

  pushError(errorMessage: string): void {
    this.error.emit(errorMessage);
  }

  load({id, source, constructor, emitter}: {
    id?: number,
    source?: Observable<any>,
    constructor: any,
    emitter: EventEmitter<any>
  }) {
    this.applyItem = emitter; // Привязка внешнего эмиттера для последующей отправки данных
    this.itemID = id;

    if (source) {
      source.subscribe((data: any) => {
        if (data.item) {
          this.constructorChange.emit(constructor);
          this.itemChange.emit(data.item);
        }
        this.active = true;
      });
    } else {
      this.constructorChange.emit(constructor);
      this.active = true;
    }
  }
}
