import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Product } from "../models/Product";
import { ProductListService } from "../services/product-list.service";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    products$: Observable<Product[]>;

    constructor(private productListService: ProductListService) { }

    ngOnInit(): void {
        this.products$ = this.fetchAll();
    }

    fetchAll(): Observable<Product[]> {
        return this.productListService.fetchAll();
    }

    post(productName: string, productType: string, productPrice: number, productCant: number, productStatus: number): void {
        const name = (<string>productName).trim();
        const type = (<string>productType).trim();
        const price = (<number>productPrice);
        const cant = (<number>productCant);
        const status = (<number>productStatus);
        if (!name || !type || !price || !cant || !status) return;

        this.products$ = this.productListService
        .post(name, type, price, cant, status)
        .pipe(tap(() => (this.products$ = this.fetchAll())));
    }

    update(consecutive: number, newName: Partial<Product>, newType: Partial<Product>, newPrice: number, newCant: number, newStatus: number): void {
        const name = (<string>newName).trim();
        const type = (<string>newType).trim();
        const price = (<number>newPrice);
        const cant = (<number>newCant);
        const status = (<number>newStatus);

        const newProduct: Product = {
            name,
            type,
            price,
            cant,
            status,
            consecutive,
        };

        this.products$ = this.productListService
        .update(newProduct)
        .pipe(tap(() => (this.products$ = this.fetchAll())));
        console.log(this.products$)
    }

    delete(consecutive: number): void {
        this.products$ = this.productListService
        .delete(consecutive)
        .pipe(tap(() => (this.products$ = this.fetchAll())));
    }
}
