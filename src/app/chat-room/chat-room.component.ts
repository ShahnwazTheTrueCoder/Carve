import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Message {
  text: string;
  isSent: boolean;
}

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent {
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

}