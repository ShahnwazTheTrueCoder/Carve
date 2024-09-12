import { CommonModule} from '@angular/common';
import { ApplicationRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatServerService } from '../chat-server.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; 

interface Message {
  message: string;
  room: string,
  user: string,
  isImage: boolean
}

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, HttpClientModule, MatMenuModule, MatButtonModule],
  providers: [ChatServerService],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  imageBase64: string | undefined;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();
  // messages = new BehaviorSubject<Message[]>([]);
  messages: Message[] = [];
  room: any = ''
  user: string
  newMessage: string = '';

  constructor(
    private chatService : ChatServerService,
    public route : ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ){
    inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable))
    .subscribe(() => { 
      this.chatService.socket.connect()
      // this.chatService.socket.emit('joinRoom', this.room)
     });
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      console.log("params",params['roomCode'])
      this.room = params['roomCode']
      this.user = params['userName']
      this.joinRoom(this.room)
      this.chatService.onMessage().subscribe((message: any) => {
        console.log("this is comming message",message,this.messages)
        if(message.user != this.user){
          this.messages.push(message);  // Add the new message to the list
          this.addMessage()
        }
      });
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  joinRoom(room: string) {
    this.chatService.socket.emit('joinRoom', room);
  }

  sendMessage() {
    if (this.newMessage && this.room) {
      const message = {
        room: this.room,
        user: this.user,
        message: this.newMessage,
        isImage: false,
        timestamp: new Date() // Add the current timestamp here
      }
      this.messages.push(message)
      this.addMessage();
      this.newMessage = ''; // Clear the input after sending
      this.chatService.sendMessage(message); // Send the message object with the timestamp

    }else if(this.imageBase64 && this.room){
      this.addMessage();
      const message = {
        room: this.room,
        user: this.user,
        message: this.imageBase64,
        isImage: true,
        timestamp: new Date()
      }
      this.messages.push(message)
      this.addMessage();
      this.imageBase64 = ''; 
      this.chatService.sendMessage(message); 
    }
  }
  

  fetchMessages(): any {
    if (this.room) {
      this.chatService.getMessages(this.room).subscribe((messages) => {
        console.log("this --- ", messages)
        return messages;
      });
    }
  }

  addMessage(): void {
    this.messagesSubject.next(this.messages);
  }

  back() {
    window.history.back()
  }
  openSnackBar() {
    this._snackBar.open('Under Progress!', 'Ok!', { verticalPosition: 'top', horizontalPosition: 'center', duration: 2000 })
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
  leaveChat() {
    this.router.navigate(['/home']); 
  }

  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Convert file to Base64 URL
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        console.log('Base64 URL:', this.imageBase64);
      };

      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);
    }
  }

  downloadImage(index) {
    console.log("index",index)
    if (this.messages[index].message && this.messages[index].isImage) {
      // Create a link element
      const link = document.createElement('a');
      link.href = this.messages[index].message;

      // Set the download attribute with a default file name
      link.download = `downloaded-image-${Date.now()}.png`;

      // Append the link to the document, trigger the download, and then remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
