import {EventEmitter, Injectable} from '@angular/core';
import { FormGroup } from "@angular/forms";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupFormService {

  active = false;

  public itemChange = new EventEmitter<any>();
  public constructorChange = new EventEmitter<any>;
  public close = new EventEmitter<void>;
  public applyItem?: EventEmitter<any>;
  public itemID?: number;

  clear(): void {
    this.itemID = undefined;
    this.close.emit();
  }

  apply(data: any) {
    if (this.applyItem) {
      this.applyItem.emit({id: this.itemID, item: data});
    }
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
        if (data) {
          this.constructorChange.emit(constructor);
          this.itemChange.emit(data);
        }
        this.active = true;
      });
    } else {
      this.constructorChange.emit(constructor);
      this.active = true;
    }
  }
}
