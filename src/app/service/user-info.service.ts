import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private isLogin = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.isLogin.asObservable(); // {2}
  }

  constructor() {
   }

   
  setLogin(isLogin){
    this.isLogin.next(true);
  }
}
