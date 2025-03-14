import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public service: ApiService) {
    this.getAllProcuts();
    this.getAllFromBasket();
  }

  public allProducts: any[] = [];
  public basketLength: number = 0;


  // updateBasketCount() {
  //   this.service.getAllFromBasket().sub
  // }

  //Products

  getAllProcuts() {
    this.service.getAllProducts().subscribe({
      next: (data: any) => {
        this.allProducts = data;
        console.log(this.allProducts);
      },
      error: (err: any) => console.log(err),
    });
  }

  // Basket

  addToCart(item: any) {
    let tempProd = {
      quantity: 1,
      price: item.price,
      productId: item.id,
    };
    this.service.addToCart(tempProd).subscribe({
      next: () => {
        this.getAllFromBasket();
        console.log(`${item.name} - was added successful.`);
        this.service.getAllFromBasket().subscribe({
          next: (data: any) => {
            this.basketLength = data.length;
            // console.log(this.basketLength);
          },
          error: (err: any) => console.log(err),
        });
        this.service.updateBasketCount(this.basketLength);
        // this.service.updateBasketCount(this.basketLength)
      },
      error: (err: any) => console.log(err),
    });
  }

  getAllFromBasket() {
    this.service.getAllFromBasket().subscribe({
      next: (data: any) => {
        this.basketLength = data.length;
        this.service.updateBasketCount(this.basketLength);
        // console.log(this.basketLength);
      },
      error: (err: any) => console.log(err),
    });
  }
}
