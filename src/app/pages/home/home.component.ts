import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  users: UserModel[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'action'];
  dataSource = new MatTableDataSource<UserModel>([]);



  constructor(private userService: UserService, public dialog: MatDialog) { }

  openDialog(user: UserModel) {
    const dialogRef = this.dialog.open(EditModalComponent, {data: {...user}});


    dialogRef.afterClosed().subscribe(result => {
      const {user, oldPassword, id} = result;
      const newUser = {...user, id}
      if(newUser.password === ''){
        newUser.password = oldPassword;
      }
      console.log(newUser as UserModel);
    });
  }

  ngOnInit() {
      this.loading = true;
      this.userService.getAll().pipe(first()).subscribe((users: UserModel[]) => {
          this.loading = false;
          this.users = users;
          this.dataSource = new MatTableDataSource<UserModel>(this.users);
      });
  }
}
