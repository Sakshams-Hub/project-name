import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`);
  }

   getproduct(id: string) {
    return this.http.get<any>('http://localhost:3000/products/'+ id);
  }
}
