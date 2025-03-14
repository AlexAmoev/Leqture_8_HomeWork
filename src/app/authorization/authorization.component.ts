import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authorization',
  imports: [],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  constructor(public service: ApiService) {}
  ngOnInit() {
    this.subscription.add(
      this.service.authShowHide$.subscribe((hide) => {
        this.hideAuth = hide;
      })
    );
  }

  public hideAuth: boolean = true;

  private subscription: Subscription = new Subscription();

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showHide() {
    this.hideAuth = !this.hideAuth;
    this.service.showHideAuth(this.hideAuth);
  }
}
