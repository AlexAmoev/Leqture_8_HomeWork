import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(public service: ApiService) {
    this.getAllFromBasket();
  }

  public allProducts: any[] = [];

  getAllFromBasket() {
    this.service.getAllFromBasket().subscribe({
      next: (data: any) => {
        this.allProducts = data;
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
