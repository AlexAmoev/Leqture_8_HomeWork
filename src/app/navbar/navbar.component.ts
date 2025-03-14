import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { AuthorizationComponent } from '../authorization/authorization.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AuthorizationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(public service: ApiService) {
    // this.ngOnInit()
  }
  ngOnInit() {
    this.getAllFromBasket();
    this.subscription.add(
      this.service.basketCount$.subscribe((count) => {
        this.basketLength = count;
      })
    );

    this.subscription.add(
      this.service.authShowHide$.subscribe((hide) => {
        this.hideAuth = hide;
      })
    );
  }

  public hideAuth: boolean = true;

  private subscription: Subscription = new Subscription();
  public basketLength: number = 0;
  // public showOverlay = true;
  // public showModel = false;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // closeOverlay() {
  //   this.showOverlay = false;
  // }

  showHide() {
    this.hideAuth = !this.hideAuth;
    this.service.showHideAuth(this.hideAuth);
  }

  getAllFromBasket() {
    this.service.getAllFromBasket().subscribe({
      next: (data: any) => {
        this.basketLength = data.length;
        // console.log(data);

        // console.log(this.basketLength);
      },
      error: (err: any) => console.log(err),
    });
  }
}
