import {Component, EventEmitter} from '@angular/core';
import { PopupFormService } from "../../services/popup-form.service";
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss']
})
export class PopupFormComponent {
  constructor(public popupFormService: PopupFormService, protected http: HttpClient) {

    this.popupFormService.close.subscribe(() => this.close());

    this.popupFormService.itemChange.subscribe((data: any) => {
      if (!this.form) return;
      console.log('data', data);

      for (const key of Object.keys(data)) {
        if (this.form?.value[key] === undefined) {
          delete data[key];
        }
      }
      this.form.setValue(data);
    });

    this.popupFormService.constructorChange.subscribe((data: any) => {
      this.fields = data;
      for (const field of this.fields) {
        if (field.optionsURL) {
          this.http.get(this.apiBasePath + field.optionsURL)
            .subscribe((data: any) => {
              field.options = data.items;
            });
        }
      }
      this.form = undefined;
      this.initForm();
    });

  }

  private readonly apiBasePath = environment.API_BASE_PATH;

  public fields: any[] = [];
  public form?: FormGroup;

  initForm(): void {
    const newForm: any = {};

    for (const field of this.fields) {
      const type = field.type;

      if (type === 'number' || type === 'select-one')
        newForm[field.key] = new FormControl(0);

      if (type === 'text' || type === 'longtext')
        newForm[field.key] = new FormControl('');

      if (type === 'select-multiple')
        newForm[field.key] = new FormControl<number[]>([]);

      if (type === 'range')
        newForm[field.key] = new FormControl({ min: 0, max: 0 });

      if (type === 'dictionary')
        newForm[field.key] = new FormControl<any>({});
    }

    this.form = new FormGroup(newForm);
    this.form.reset();
  }

  apply(): void {
    this.popupFormService.apply(this.form?.value);
  }

  close(): void {
    this.popupFormService.active = false;
    this.form = undefined;
    this.fields = [];
  }
}
