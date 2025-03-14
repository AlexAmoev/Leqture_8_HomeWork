import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(public service: ApiService) {
    this.getAllFromBasket();
    this.loaderInfo();
  }

  public allProducts: any[] = [];
  public basketLength: number = 0;
  public isLoadnig: boolean = true;

  loaderInfo() {
    this.service.loader.subscribe((data: any) => {
      this.isLoadnig = data;
    });
  }

  getAllFromBasket() {
    this.service.getAllFromBasket().subscribe({
      next: (data: any) => {
        this.basketLength = data.length;
        this.allProducts = [];
        data.forEach((element: any) => {
          let existingItem = this.allProducts.find(
            (p) => p.product.id === element.product.id
          );

          if (existingItem) {
            existingItem.quantity += element.quantity;
          } else {
            this.allProducts.push({ ...element });
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  del(product: any) {
    // console.log(product.product.id);

    this.service.deleteFromBasket(product.product.id).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.getAllFromBasket();
        this.service.updateBasketCount(this.basketLength - 1);
        // console.log(this.basketLength - 1);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  add(product: any) {
    let tempProd = {
      quantity: product.quantity + 1,
      price: product.price,
      productId: product.product.id,
    };

    // console.log(tempProd);

    this.service.updateBasket(tempProd).subscribe({
      next: (data: any) => {
        // console.log(data);

        this.getAllFromBasket();
      },
      error: (err: any) => console.log(err),
    });
  }

  decrease(product: any) {
    let tempProd = {
      quantity: product.quantity - 1,
      price: product.price,
      productId: product.product.id,
    };

    if (tempProd.quantity == 0) {
      this.del(product);
    } else {
      this.service.updateBasket(tempProd).subscribe({
        next: (data: any) => {
          // console.log(data);

          this.getAllFromBasket();
        },
        error: (err: any) => console.log(err),
      });
    }
  }
}
