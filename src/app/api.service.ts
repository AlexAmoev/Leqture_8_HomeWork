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

  public loader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  updateBasketCount(count: number) {
    this.basketCount.next(count);
  }

  private authShowHide: BehaviorSubject<boolean> = new BehaviorSubject(true);
  authShowHide$ = this.authShowHide.asObservable();

  showHideAuth(hide: boolean) {
    this.authShowHide.next(hide);
  }

  statrLoading() {
    this.loader.next(true);
  }

  stopLoading() {
    this.loader.next(false);
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

  updateBasket(product: any) {
    return this.http.put(
      'https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket',
      product
    );
  }

  deleteFromBasket(id: number) {
    return this.http.delete(
      `https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`
    );
  }

  //Products

  getAllProducts() {
    return this.http.get(
      'https://restaurant.stepprojects.ge/api/Products/GetAll'
    );
  }
}
