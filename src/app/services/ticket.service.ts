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
   * Salvar / Atualizar
   * @param ticket Ticket
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
   * buscar todos
   * @param page pagina
   * @param count quantidade
   */
  findAll(page: number, count: number) {
    return this.http.get(`${HELPDESK_API}/api/ticket/${page}/${count}`);
  }

  /**
   * buscar
   * @param id Identificador
   */
  findById(id: string) {
    return this.http.get(`${HELPDESK_API}/api/ticket/${id}`);
  }

  /**
   * Apagar registro
   * @param id identificador
   */
  delete(id: string) {
    return this.http.delete(`${HELPDESK_API}/api/ticket/${id}`);
  }

  /**
   * buscar
   * @param page pagina
   * @param count quantidade
   * @param assinedToMe assinado para mim
   * @param t Ticket
   */
  findByParam(page: number, count: number, assinedToMe: boolean, t: Ticket) {
    t.numbers = t.numbers == null ? 0 : t.numbers;
    t.title = t.title == null ? 'uniformed' : t.title;
    t.title = t.status == null ? 'uniformed' : t.status;
    t.title = t.priority == null ? 'uniformed' : t.priority;
    return this.http.get(`${HELPDESK_API}/api/user/${page}/${count}/${t.numbers}/${t.title}/${t.status}/${t.priority}/${assinedToMe}`);
  }

  changeStatus(status: string, ticket: Ticket) {
    return this.http.put(`${HELPDESK_API}/api/ticket/${ticket.id}/${status}`, ticket);
  }

  sumary() {
    return this.http.get(`${HELPDESK_API}/api/ticket/sumary`);
  }
}
