// selected-quantity.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {
  private selectedQuantities: { [productId: number]: number } = {};

  constructor() { }

  setSelectedQuantity(productId: number, quantity: number): void {
    this.selectedQuantities[productId] = quantity;
  }

  getSelectedQuantity(productId: number): number {
    return this.selectedQuantities[productId] || 50; // Return default quantity if not set
  }
}
  