import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatServerService {
  roomCode:any = null
  private apiUrl = 'https://detailed-checkered-barge.glitch.me/'; 
  public socket 

  constructor(private http: HttpClient) { 
    this.socket =  io(this.apiUrl, {
      transports: ['websocket'],
      autoConnect : false
    });
  }
  
  async joinRoom(room: string): Promise<any> {  
    // Emit the joinRoom event to the server
    this.socket.emit('joinRoom', room);
  
    // Return a promise that resolves when 'loadMessages' event is received
    return new Promise((resolve, reject) => {
      this.socket.on('loadMessages', (data: any) => {
        console.log('Received loadMessages:', data);
        resolve(data); // Resolve the promise with the received data
      });
  
      // Optionally, you can also handle connection errors or timeouts
      this.socket.on('connect_error', (err: any) => {
        console.error('Connection error:', err);
        reject(err); // Reject the promise if there's a connection error
      });
    });
  }

  
  sendMessage(message: { room: string, user: string, message: string, isSent:boolean }) : any {
    console.log("meeg-->",message)
    this.socket.emit('sendMessage', message);
  }
  
  receiveMessages(): Observable<{ room: string, user: string, message: string, isSent:boolean }> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', (data:any) => {
        observer.next(data);
      });
    });
  }

  getMessages(room: string): Observable<{ room: string, user: string, message: string, isSent:boolean }[]> {
    return this.http.get<{ room: string, user: string, message: string,isSent:boolean }[]>(`${this.apiUrl}messages?room=${room}`);
  }
  getAllRooms(){
    return this.http.get<{ room: string}[]>(`${this.apiUrl}getAllRoom`);
  }

  
  public onMessage(): Observable<{ room: string, user: string, message: string, isSent:boolean }> {
    return new Observable((observer) => {
      this.socket.on('message', (data : any) => {
        observer.next(data);
      });
    });
  }
}
