import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private _sessionStorage:SessionStorageService) { }
  
  public setUser(user:User):void {
    if (user)
      this._sessionStorage.store("user", user);
  }
  
  public getUser():User {
    let user = this._sessionStorage.retrieve("user");
    return user;
  }
}
