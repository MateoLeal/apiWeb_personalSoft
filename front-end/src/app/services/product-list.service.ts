import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { Product } from "../models/Product";

@Injectable({
  providedIn: "root",
})
export class ProductListService {
  private url = "http://localhost:3000/products";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}

  fetchAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched products")),
        catchError(
          this.errorHandlerService.handleError<Product[]>("fetchAll", [])
        )
      );
  }

  post(name: string, type: string, price: number, cant: number, status: number): Observable<any> {
    return this.http
      .post<Partial<Product>>(this.url, {name, type, price, cant, status}, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(product: Product): Observable<any> {
    return this.http
      .put<Product>(this.url, product, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(consecutive: number): Observable<any> {
    const url = `http://localhost:3000/products/${consecutive}`;

    return this.http
      .delete<Product>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }
}
