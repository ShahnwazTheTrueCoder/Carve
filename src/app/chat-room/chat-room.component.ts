import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatServerService } from '../chat-server.service';
import {HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

interface Message {
  message: string;
  room : string,
  user: string,
  isSent : boolean
}

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,HttpClientModule,MatMenuModule,MatButtonModule],
  providers:[ChatServerService],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent {

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();
  // messages = new BehaviorSubject<Message[]>([]);
  messages: Message[] = [];
  room : any = ''
  user: string 
  newMessage: string = '';

  constructor(
    private chatService : ChatServerService,
    public route : ActivatedRoute,
    private _snackBar: MatSnackBar,
     @Inject(PLATFORM_ID) private platformId: any
  ){
  }

  
  ngOnInit() {
     if (isPlatformBrowser(this.platformId)) {
      this.user = localStorage.getItem("user")
      this.route.queryParams.subscribe(params => {
        console.log("params", params['roomCode'])
        this.room = params['roomCode']
        this.joinRoom(this.room)
        this.chatService.onMessage().subscribe((message: any) => {
          console.log("this is comming message", message, this.messages)
          this.addMessage
          this.messages.push(message);  // Add the new message to the list
        });
      })
    }
  }
  
  joinRoom(room:string) {
    this.chatService.socket.emit('joinRoom', room);
  }
  
  sendMessage() {
    if (this.newMessage && this.room) {
      this.chatService.sendMessage({ room: this.room, user: this.user, message: this.newMessage, isSent : true })
      this.addMessage()
      this.newMessage = '';
    }
  }
  
  fetchMessages() : any {
    if (this.room) {
      this.chatService.getMessages(this.room).subscribe((messages) => {
        console.log("this --- ",messages)
        return messages;
      });
    }
  }
  
  addMessage(): void {
    this.messagesSubject.next(this.messages);
  }
  
  back(){
    window.history.back()
  }
  openSnackBar(){
    this._snackBar.open('Under Progress!','Ok!',{verticalPosition:'top',horizontalPosition:'center',duration:2000})
  }
}
