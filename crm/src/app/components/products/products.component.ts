import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(protected productsService: ProductsService) { }

  products: any[] = [];

  columns = [
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

  parseProducts(products: any[]): any[] {
    return products.map(product => {
        const result = product;
        result.store = result.store.title || null;
        result.category = result.category.name || null;
        return result;
      }
    )
  }

  ngOnInit(): void {
    this.productsService.get()
      .subscribe(response => {
        if (response?.products) {
          this.products = this.parseProducts(response.products);
        }
      });
  }

}
