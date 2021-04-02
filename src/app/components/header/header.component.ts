import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login = false;
  // subscription: Subscription;

  // constructor(private userService : UserService){
  //   this.subscription = this.userService.getLoginStatus()
  //   .subscribe(isLogin => this.login = isLogin);
  // }

  ngOnInit(): void {

  }

  title = 'user-manager';



  onLogout(){
    // this.userService.sendLoginStatus(false);
    // localStorage.clear();
  }

  // ngOnDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.subscription.unsubscribe();
  // }

}
