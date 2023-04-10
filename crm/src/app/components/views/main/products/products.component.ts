import {Component, EventEmitter, OnInit} from '@angular/core';
import { ProductsService } from "../../../../services/products.service";
import { FilterField } from "../../../../types/FilterField";
import { StoresService } from "../../../../services/stores.service";
import { PopupFormService } from "../../../../services/popup-form.service";
import { columns, filters, constructor } from "../../../../forms/products";
import {CategoriesService} from "../../../../services/categories.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private storesService: StoresService,
    private categoriesService: CategoriesService,
    private popupFormService: PopupFormService
  ) {
    this.createEmitter.subscribe((data: any) => this.createProduct(data.item));
    this.updateEmitter.subscribe((data: any) => this.updateProduct(data.id, data.item));
  }

  products: any[] = [];
  loading = false;

  columns = columns;
  filters = filters;

  protected updateEmitter = new EventEmitter<any>();
  protected createEmitter = new EventEmitter<any>();

  parseProducts(products: any[]): any[] {
    return products.map(product => {
        const result = product;
        result.store = result.store.name || null;
        result.category = result.category.name || null;
        return result;
      }
    );
  }

  private filtersData?: any;

  loadProducts(data?: any) {
    if (!data) {
      data = this.filtersData;
    }
    this.filtersData = data;

    this.loading = true;
    this.productsService.get(data)
      .subscribe(response => {
        this.products = this.parseProducts(response.products ?? []);
        this.loading = false;
      });
  }

  createProduct(item: any): void {
    this.productsService.create(item)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadProducts();
        } else if (data.statusCode === 'error') {
          alert(data.statusMessage);
        }
      });
  }

  updateProduct(id: number, newData: any): void {
    this.productsService.update(id, newData)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadProducts();
        } else if (data.statusCode === 'error') {
          alert(data.statusMessage);
        }
      });
  }

  deleteProduct(id: number): void {
    if (!confirm(`Are you sure you want to delete product #${id}?`))
      return;
    this.productsService.delete(id)
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

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadStores();
  }

}
