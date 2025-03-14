import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public service: ApiService) {
    this.getAllProcuts();
    this.getAllFromBasket();
    this.loaderInfo();
  }

  public allProducts: any[] = [];
  private allFromBasket: any[] = [];
  public basketLength: number = 0;
  public isLoading: boolean = true;

  loaderInfo() {
    this.service.loader.subscribe((data: any) => {
      this.isLoading = data;
    });
  }

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

  // addToCart(item: any) {
  //   let tempBool = true;
  //   let tempProd = {
  //     quantity: 1,
  //     price: item.price,
  //     productId: item.id,
  //   };
  //   console.log(item);

  //   this.getAllFromBasket();
  //   console.log(this.allFromBasket.length);

  //   if (this.allFromBasket.length == 0) {
  //     console.log('First if');
  //     tempBool = false;

  //     for (let i = 0; i < this.allFromBasket.length; i++) {
  //       if (this.allFromBasket[i].product.id == tempProd.productId) {
  //         tempBool = false;
  //       } else {
  //         tempBool = true;
  //       }
  //     }
  //   } else {
  //     tempBool = true;
  //   }

  //   console.log(tempBool);

  //   if (tempBool) {
  //     console.log('if');
  //     for (let i = 0; i < this.allFromBasket.length; i++) {
  //       if (this.allFromBasket[i].product.id == tempProd.productId) {
  //         tempProd.quantity = this.allFromBasket[i].quantity + 1;
  //         let result = this.service.updateBasket(tempProd).subscribe();
  //         console.log("result = ",result);

  //         console.log(tempProd);
  //         return;
  //       }
  //     }
  //   } else {
  //     console.log('else');
  //     this.service.addToCart(tempProd).subscribe({
  //       next: () => {
  //         this.getAllFromBasket();
  //         console.log(`${item.name} - was added successful.`);
  //         this.service.getAllFromBasket().subscribe({
  //           next: (data: any) => {
  //             this.basketLength = data.length;
  //             // console.log(this.basketLength);
  //           },
  //           error: (err: any) => console.log(err),
  //         });
  //         this.service.updateBasketCount(this.basketLength);
  //         // this.service.updateBasketCount(this.basketLength)
  //       },
  //       error: (err: any) => console.log(err),
  //     });
  //   }
  // }

  getAllFromBasket() {
    this.service.getAllFromBasket().subscribe({
      next: (data: any) => {
        this.basketLength = data.length;
        this.allFromBasket = data;
        this.service.updateBasketCount(this.basketLength);
        console.log(this.allFromBasket);
      },
      error: (err: any) => console.log(err),
    });
  }

  addToCart(item: any) {
    let tempProd = {
      quantity: 1,
      price: item.price,
      productId: item.id,
    };

    this.service.getAllFromBasket().subscribe({
      next: (data: any) => {
        this.allFromBasket = data;

        let existingItem = this.allFromBasket.find(
          (basketItem) => basketItem.product.id === tempProd.productId
        );

        if (existingItem) {
          tempProd.quantity = existingItem.quantity + 1;
          this.service.updateBasket(tempProd).subscribe({
            next: () => {
              this.getAllFromBasket();
            },
            error: (err: any) => console.error(err),
          });
        } else {
          this.service.addToCart(tempProd).subscribe({
            next: () => {
              this.getAllFromBasket();
            },
            error: (err: any) => console.error(err),
          });
        }
      },
      error: (err: any) => console.error(err),
    });
  }
}
