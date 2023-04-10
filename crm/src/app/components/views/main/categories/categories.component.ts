import { Component, EventEmitter, OnInit } from '@angular/core';
import { CategoriesService } from "../../../../services/categories.service";
import { PopupFormService } from "../../../../services/popup-form.service";
import { columns, filters, constructor } from "../../../../forms/categories";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(protected categoriesService: CategoriesService, protected popupFormService: PopupFormService) {
    this.createEmitter.subscribe((data: any) => this.createCategory(data.item));
    this.updateEmitter.subscribe((data: any) => this.updateCategory(data.id, data.item));
  }

  categories: any[] = [];
  loading = false;

  columns = columns;
  filters = filters;

  protected updateEmitter = new EventEmitter<any>();
  protected createEmitter = new EventEmitter<any>();

  private filtersData?: any;

  loadCategories(data?: any): void {
    if (!data) {
      data = this.filtersData;
    }
    this.filtersData = data;

    this.loading = true;
    this.categoriesService.get()
      .subscribe(data => {
        this.categories = data.categories ?? [];
        this.loading = false;
      });
  }

  createCategory(item: any): void {
    this.categoriesService.create(item)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadCategories();
        } else if (data.statusCode === 'error') {
          this.popupFormService.pushError(data.statusMessage);
        }
      });
  }

  updateCategory(id: number, newData: any): void {
    this.categoriesService.update(id, newData)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadCategories();
        } else if (data.statusCode === 'error') {
          this.popupFormService.pushError(data.statusMessage);
        }
      });
  }

  deleteCategory(id: number): void {
    if (!confirm(`Are you sure you want to delete category #${id}?`))
      return;

    const replacement = Number(prompt('Enter id of the replacement category'));
    if (isNaN(replacement)) {
      return alert('Wrong ID!');
    }

    this.categoriesService.delete(id, replacement)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.loadCategories();
        } else if (data.statusCode === 'error') {
          alert(data.statusMessage);
        }
      });
  }

  showEditForm(itemID: number): void {
    this.popupFormService.load({
      id: itemID,
      source: this.categoriesService.getOne(itemID),
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
    this.loadCategories();
  }
}
