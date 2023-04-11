import {Component, EventEmitter} from '@angular/core';
import { PopupFormService } from "../../services/popup-form.service";
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {ConstructorField} from "../../types/Fields";

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss']
})
export class PopupFormComponent {
  constructor(public popupFormService: PopupFormService, public authService: AuthService, protected http: HttpClient) {

    this.popupFormService.close.subscribe(() => this.close());

    this.popupFormService.itemChange.subscribe((data: any) => {
      this.error = undefined;
      if (!this.form) return;

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
        if (field.adminOnly && !this.user.isAdmin) continue;

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

    this.popupFormService.error.subscribe((error: string) => {
      this.error = error;
    });
  }

  private readonly apiBasePath = environment.API_BASE_PATH;

  fields: ConstructorField[] = [];
  form?: FormGroup;
  error?: string;

  user = this.authService.user;

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
