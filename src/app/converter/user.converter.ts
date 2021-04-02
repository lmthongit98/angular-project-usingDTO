import { Injectable } from "@angular/core";
import { UserDTO } from "../dto/user.dto";
import { UserFactory } from "../factory/user.factory";
import { UserModel } from "../model/user.model";
import { Converter } from "./converter";


@Injectable({
  providedIn: 'root'
})
export class UserConverter implements Converter {
  constructor(private factory: UserFactory) {
  }
  toModel(dto: UserDTO): UserModel {
    return this.factory.modelFromDto(dto);
  }
  toDto(model: UserModel): UserDTO {
    return this.factory.dtoFromModel(model);
  }
}
