import {Component, OnInit} from '@angular/core';
import {columns, filters} from "../../../../forms/sales";
import {StoresService} from "../../stores/services/stores.service";
import {SalesService} from "../services/sales.service";

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

    sales: any[] = [];
    loading = false;

    columns = columns;
    filters = filters;

    private filtersData?: any;

    constructor(private salesService: SalesService, private storesService: StoresService) {}

    loadSales(data?: any): void {
        if (!data) {
            data = this.filtersData;
        }
        this.filtersData = data;

        this.loading = true;
        this.salesService.get(data)
            .subscribe(response => {
                this.sales = response.sales ?? [];
                this.loading = false;
            });
    }

    loadSellers(): void {
        this.storesService.getShort()
            .subscribe(data => {
                if (data?.items) {
                    const target = this.filters.find(item => item.key === 'seller');
                    if (target) {
                        target.options = data.items;
                    }
                }
            });
    }


    ngOnInit(): void {
        this.loadSales();
        this.loadSellers()
    }
}
