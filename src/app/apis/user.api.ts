import { UserDTO } from "../dto/user.dto";
import { catchError } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from "./path.builder";

const LOGIN_PATH = HOST + '/auth/login'
const REGISTER_PATH = HOST + '/users/register';
const GET_USERS_PATH = HOST + '/users';
const UPDATE_USERS_PATH = HOST + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserAPI {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  login(username: string, password: string) {
    return this.http.post<any>(LOGIN_PATH, {username, password}, this.httpOptions)
  }

  register(userDto: UserDTO){
    return this.http.post<UserDTO>(REGISTER_PATH, userDto, this.httpOptions);

  }


  getAll() {
    return this.http.get<UserDTO[]>(GET_USERS_PATH);
  }



}
