import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  users: UserModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.loading = true;
      this.userService.getAll().pipe(first()).subscribe((users: UserModel[]) => {
          this.loading = false;
          this.users = users;
      });
  }
}
