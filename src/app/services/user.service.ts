import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Injectable } from '@angular/core';
import { HELPDESK_API } from './helpdesck.api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${HELPDESK_API}/api/auth`, user);
  }

  createOrUpdate(user: User) {
    if (user.id != null && user.id != '') {
      return this.http.put(`${HELPDESK_API}/api/user`, user);
    } else {
      this.http.post(`${HELPDESK_API}/api/user`, user);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELPDESK_API}/api/user/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${HELPDESK_API}/api/user/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${HELPDESK_API}/api/user/${id}`);
  }
}
