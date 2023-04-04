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

  private _item?: any[];
  private _itemID?: number;

  get item(): any {
    return this._item;
  }

  set item(val: any[]) {
    this._item = val;
    this.itemChange.emit(this._item);
  }

  clear(): void {
    this._item = undefined;
    this._itemID = undefined;
    this.close.emit();
  }

  apply(data: any) {
    if (this.applyItem) {
      this.applyItem.emit({id: this._itemID, item: data});
    }
  }

  load({id, source, constructor, emitter}: {
    id: number,
    source: Observable<any>,
    constructor: any,
    emitter: EventEmitter<any>
  }) {
    this.applyItem = emitter; // Привязка внешнего эмиттера для последующей отправки данных
    this._itemID = id;

    return new Promise<void>(resolve => {

      source.subscribe((data: any) => {
        if (data) {
          this.constructorChange.emit(constructor);
          this.item = data;
        }
        this.active = true;
        resolve();
      });

    });
  }
}
