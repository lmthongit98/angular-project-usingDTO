import { Observable } from "rxjs";
import { UserAPI } from "../apis/user.api";
import { map } from 'rxjs/operators';
import { UserModel } from "../model/user.model";
import { UserConverter } from "../converter/user.converter";
import { Injectable } from "@angular/core";
import { Converter } from "../converter/converter";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: UserAPI, private converter: UserConverter) {}

  login(username: string, password: string) {
    //handle login
    return this.api.login(username, password);
  }

  register(user: UserModel){
    return this.api.register(this.converter.toDto(user))
  }

  getAll(){
    return this.api.getAll();
  }

  // getAll(): Observable<UserModel[]> {
  //   return this.api.getAll().pipe(map(arrDto => arrDto.map(item => this.converter.toModel(item))))
  // }
}
