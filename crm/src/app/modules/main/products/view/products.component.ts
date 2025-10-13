import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {StoresService} from "../../stores/services/stores.service";
import {PopupFormService} from "../../../../services/popup-form.service";
import {columns, constructor, filters} from "../../../../forms/products";
import {CategoriesService} from "../../categories/services/categories.service";
import {convertToBase64} from "../../../../core/base64";
import {Subject, takeUntil} from "rxjs";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

    products: any[] = [];
    loading = false;

    columns = columns;
    filters = filters;

    readonly destroy$ = new Subject<void>();

    protected updateEmitter = new EventEmitter<any>();
    protected createEmitter = new EventEmitter<any>();

    private filtersData?: any;

    constructor(
        private productsService: ProductsService,
        private storesService: StoresService,
        private categoriesService: CategoriesService,
        private popupFormService: PopupFormService
    ) {
        this.createEmitter
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => this.createProduct(data.item));

        this.updateEmitter
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => this.updateProduct(data.id, data.item));
    }

    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories();
        this.loadStores();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    parseProducts(products: any[]): any[] {
        return products.map(product => {
                const result = product;
                result.store = result.store?.name || null;
                result.category = result.category?.name || null;
                return result;
            }
        );
    }

    loadProducts(data?: any) {
        if (!data) {
            data = this.filtersData;
        }
        this.filtersData = data;

        this.loading = true;
        this.productsService.get(data)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                this.products = this.parseProducts(response.products ?? []);
                this.loading = false;
            });
    }

    createProduct(item: any): void {
        this.productsService.create(item)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                if (data.statusCode === 'ok') {
                    this.popupFormService.clear();
                    this.loadProducts();
                } else if (data.statusCode === 'error') {
                    this.popupFormService.pushError(data.statusMessage);
                }
            });
    }

    updateProduct(id: number, newData: any): void {
        this.productsService.update(id, newData)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                if (data.statusCode === 'ok') {
                    this.popupFormService.clear();
                    this.loadProducts();
                } else if (data.statusCode === 'error') {
                    this.popupFormService.pushError(data.statusMessage);
                }
            });
    }

    deleteProduct(id: number): void {
        if (!confirm(`Are you sure you want to delete product #${id}?`))
            return;
        this.productsService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                if (data.statusCode === 'ok') {
                    const index = this.products.findIndex(item => item.id === id);
                    this.products.splice(index, 1);
                } else if (data.statusCode === 'error') {
                    alert(data.statusMessage);
                }
            });
    }

    loadCategories(): void {
        this.categoriesService.getShortList()
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                if (data?.items) {
                    const target = this.filters.find(item => item.key === 'category');
                    if (target) {
                        target.options = data.items;
                    }
                }
            });
    }

    loadStores(): void {
        this.storesService.getShort()
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                if (data?.items) {
                    const target = this.filters.find(item => item.key === 'store');
                    if (target) {
                        target.options = data.items;
                    }
                }
            });
    }

    showEditForm(itemID: number): void {
        this.popupFormService.load({
            id: itemID,
            source: this.productsService.getOne(itemID),
            constructor: constructor,
            emitter: this.updateEmitter
        });
    }

    showCreateForm(): void {
        this.popupFormService.load({
            constructor: constructor,
            emitter: this.createEmitter
        });
    }

    async sendPicture(productID: number, picture: File): Promise<void> {
        const pictureBase64 = await convertToBase64(picture);
        this.productsService.addPicture(productID, pictureBase64)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                if (data.statusCode === 'ok') {
                    alert('Uploaded successfully!');
                    this.loadProducts();
                } else {
                    alert(data.statusMessage);
                }
            });
    }

    uploadPicture(data: { id: number, tag: string, picture: File }): void {
        if (data.tag === 'picture') {
            this.sendPicture(data.id, data.picture);
        }
    }

}
