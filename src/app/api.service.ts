import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  private basketCount: BehaviorSubject<number> = new BehaviorSubject(0);
  basketCount$ = this.basketCount.asObservable();

  updateBasketCount(count: number) {
    this.basketCount.next(count);
  }

  private authShowHide: BehaviorSubject<boolean> = new BehaviorSubject(true);
  authShowHide$ = this.authShowHide.asObservable();

  showHideAuth(hide: boolean) {
    this.authShowHide.next(hide);
  }

  // public basketCount: BehaviorSubject<number> = new BehaviorSubject(0);

  // updateBasketCount(count: number) {
  //   this.basketCount.next(count);
  // }

  //Baskets

  addToCart(product: any) {
    return this.http.post(
      'https://restaurant.stepprojects.ge/api/Baskets/AddToBasket',
      product
    );
  }

  getAllFromBasket() {
    return this.http.get(
      'https://restaurant.stepprojects.ge/api/Baskets/GetAll'
    );
  }

  //Products

  getAllProducts() {
    return this.http.get(
      'https://restaurant.stepprojects.ge/api/Products/GetAll'
    );
  }
}
