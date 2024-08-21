import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

interface Message {
  text: string;
  isSent: boolean;
}

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,MatMenuModule,MatButtonModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent {

  constructor(private _snackBar: MatSnackBar){

  }
  messages: Message[] = [
    { text: 'Hello!', isSent: false },
    { text: 'Hi, how are you?', isSent: true },
    { text: 'I am good, thanks!', isSent: false }
  ];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, isSent: true });
      this.newMessage = '';
    }
  }

  back(){
    window.history.back()
  }

  openSnackBar(){
    this._snackBar.open('Under Progress!','Ok!',{verticalPosition:'top',horizontalPosition:'center',duration:2000})
  }
}
