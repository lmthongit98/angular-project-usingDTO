import { Injectable } from "@angular/core";
import { UserDTO } from "../dto/user.dto";
import { UserModel } from "../model/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserFactory {

  model(): any{
    return {
      username: '',
      email: '',
      password: '',
      token: '',
    }
  }


  modelFromDto(dto: UserDTO): UserModel {
    // return model

    return Object.assign(this.model(), dto);
  }

  dtoFromModel(dto: UserModel): UserDTO {
    // return dto

    return Object.assign(this.model(), dto);
  }
}
