import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../../../services/products.service";
import { FilterField } from "../../../../types/FilterField";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(protected productsService: ProductsService) { }

  products: any[] = [];

  readonly columns = [
    {
      tag: 'id',
      name: 'ID'
    },
    {
      tag: 'category',
      name: 'Category'
    },
    {
      tag: 'title',
      name: 'Title'
    },
    {
      tag: 'description',
      name: 'Description'
    },
    {
      tag: 'price',
      name: 'Price'
    },
    {
      tag: 'price_postfix',
      name: 'Unit',
      default: 'per pc.'
    },
    {
      tag: 'count_available',
      name: 'In stock',
      important: true
    },
    {
      tag: 'store',
      name: 'Seller'
    }
  ];

  readonly filters: FilterField[] = [
    {
      key: 'id',
      name: 'ID',
      type: 'number'
    },
    {
      key: 'category',
      name: 'Categories',
      type: 'select-multiple',
      options: []
    },
    {
      key: 'title',
      type: 'text'
    },
    {
      key: 'description',
      type: 'text'
    },
    {
      key: 'price',
      type: 'range'
    },
    {
      key: 'count_available',
      name: 'In Stock',
      type: 'range'
    },
    {
      key: 'seller',
      name: 'Sellers',
      type: 'select-multiple',
      options: []
    }
  ];

  parseProducts(products: any[]): any[] {
    return products.map(product => {
        const result = product;
        result.store = result.store.title || null;
        result.category = result.category.name || null;
        return result;
      }
    );
  }

  loadProducts(data?: any): void {
    this.productsService.get(data)
      .subscribe(response => {
        if (response?.products) {
          this.products = this.parseProducts(response.products);
        }
      });
  }

  loadCategories(): void {
    this.productsService.getCategories()
      .subscribe(data => {
        if (data?.categories) {
          const target = this.filters.find(item => item.key === 'category');
          if (target) {
            target.options = data.categories;
          }
        }
      })
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

}
