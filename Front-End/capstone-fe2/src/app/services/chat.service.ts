import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  creaChat(data: any): Observable<Chat> {
    return this.http.post<Chat>(
      'http://localhost:8080/api/chat',
      data
    );
  }

  getChat(id: number): Observable<Chat> {
    return this.http.get<Chat>(`http://localhost:8080/api/chat/${id}`);
  }

  aggiornaChat(id: number, chat: Chat): Observable<any> {
    return this.http.put(`http://localhost:8080/api/chat/${id}`, chat);
  }

  eliminaChat(id: number): Observable<Chat> {
    return this.http.delete<Chat>(`http://localhost:8080/api/chat/${id}`)
  }

}
