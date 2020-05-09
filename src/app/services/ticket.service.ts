import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../model/ticket.model';
import { HELPDESK_API } from './helpdesck.api';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }


  /**
   *
   * @param ticket
   */
  createOrUpdate(ticket: Ticket) {
    if (ticket.id != null && ticket.id !== '') {
      return this.http.put(`${HELPDESK_API}/api/ticket`, ticket);
    } else {
      ticket.id = null;
      ticket.status = 'New';
      return this.http.post(`${HELPDESK_API}/api/ticket`, ticket);
    }
  }

  /**
   *
   * @param page
   * @param count
   */
  findAll(page: number, count: number) {
    return this.http.get(`${HELPDESK_API}/api/ticket/${page}/${count}`);
  }

  /**
   *
   * @param id
   */
  findById(id: string) {
    return this.http.get(`${HELPDESK_API}/api/ticket/${id}`);
  }

  /**
   * Apagar registro
   * @param id identificador;
   */
  delete(id: string) {
    return this.http.delete(`${HELPDESK_API}/api/ticket/${id}`);
  }
}
