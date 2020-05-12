import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../model/user.model';


@Injectable()
export class SharedService {

  public static instance: SharedService = null;
  user: User;
  token: string;
  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  /**
   * st
   */
  public static getInstance() {
    if (this.instance == null) {
      this.instance = new SharedService();
    }
    return this.instance;
  }

  /**
   * isLoggedIn
   */
  public isLoggedIn() {
    if (this.user == null) {
        return false;
    }

    return this.user.email !== '';
  }
}
