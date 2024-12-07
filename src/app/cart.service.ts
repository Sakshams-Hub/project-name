import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private apiUrl = 'http://localhost:3000';
    private items: any[] = []

    constructor(private http: HttpClient) { }


    addToCart(product: any) {
        this.items.push(product)
    }

    getItems() {
        return this.items;
    }

}
    



