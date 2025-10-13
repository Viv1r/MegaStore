import {Component, OnDestroy, OnInit} from '@angular/core';
import {PopupFormService} from "../../services/popup-form.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {ConstructorField} from "../../models/fields";
import {CommonModule} from "@angular/common";
import {SelectOneComponent} from "../fields/select-one/select-one.component";
import {SelectMultipleComponent} from "../fields/select-multiple/select-multiple.component";
import {DictionaryComponent} from "../fields/dictionary/dictionary.component";
import {FieldType} from "../../models/field-type";
import {getFormControlByType} from "./models/get-form-control-by-type";
import {BehaviorSubject, firstValueFrom, Subject, takeUntil} from "rxjs";
import {PopupOptionsService} from "./services/popup-options.service";

@Component({
    standalone: true,
    selector: 'app-popup-form',
    templateUrl: './popup-form.component.html',
    styleUrls: ['./popup-form.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SelectOneComponent,
        SelectMultipleComponent,
        DictionaryComponent
    ],
    providers: [
        PopupOptionsService
    ]
})
export class PopupFormComponent implements OnInit, OnDestroy {

    fields: ConstructorField[] = [];
    form?: FormGroup;
    error?: string;

    readonly destroy$ = new Subject<void>();

    readonly user = this.authService.user;

    readonly isPopupActive$ = this.popupFormService.active$;
    readonly popupFormItem$ = this.popupFormService.popupFormItem$;

    constructor(
        private popupFormService: PopupFormService,
        private authService: AuthService,
        private popupOptionsService: PopupOptionsService
    ) {}

    ngOnInit(): void {
        this.subscribeToPopup();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initForm(): void {
        const newForm: any = {};

        for (const field of this.fields) {
            newForm[field.key] = getFormControlByType(field.type);
        }

        this.form = new FormGroup(newForm);
        this.form.reset();
    }

    subscribeToPopup(): void {
        this.popupFormService.close$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.close());

        this.popupFormService.itemChange$
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                this.error = undefined;
                if (!this.form) return;

                for (const key of Object.keys(data)) {
                    if (this.form?.value[key] === undefined) {
                        delete data[key];
                    }
                }
                this.form.setValue(data);
            });

        this.popupFormService.constructorChange$
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                this.fields = data;
                for (const field of this.fields) {
                    if (field.adminOnly && !this.user.isAdmin) continue;

                    if (field.optionsURL) {
                        firstValueFrom(
                            this.popupOptionsService.getOptions(field.optionsURL)
                        ).then((data: any) => {
                            field.options = data.items;
                        });
                    }
                }
                this.form = undefined;
                this.initForm();
            });

        this.popupFormService.error$
            .pipe(takeUntil(this.destroy$))
            .subscribe((error: string) => {
                this.error = error;
            });
    }

    apply(): void {
        this.popupFormService.apply(this.form?.value);
    }

    close(): void {
        this.popupFormService.active$.next(false);
        this.form = undefined;
        this.fields = [];
    }
}
