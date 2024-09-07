import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ChatServerService } from '../chat-server.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-dialog-overview',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,CommonModule,ReactiveFormsModule,RouterModule,HttpClientModule],
  providers : [ChatServerService],
  templateUrl: './dialog-overview.component.html',
  styleUrl: './dialog-overview.component.scss'
})

export class DialogOverviewComponent {
  form: FormGroup;
  createRoomDailog = false
  constructor(public dialogRef: MatDialogRef<DialogOverviewComponent>, private fb: FormBuilder,
    public router:Router ,public chatServ : ChatServerService ) {

    this.form = this.fb.group({
      roomCode: ['', [Validators.required]]
      // roomCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get roomCode() {
    return this.form.get('roomCode');
  }

onClose(): void {
  this.dialogRef.close();
}

joinRoom(): void {
  if (this.form.valid) {
    // this.chatServ.getAllRooms().subscribe(data=>{
    //   if(data){
    //     // console.log("this is all rooms",data)
    //     let isExist = data.filter(item=>item.room == this.roomCode?.value)
    //     if(isExist.length){
    //       // this.chatServ.roomCode = this.roomCode?.value
    //       console.log("this is all rooms",isExist,this.chatServ.roomCode)
    //       this.dialogRef.close();
    //       this.router.navigate(['/chat-room'],{
    //         queryParams: { roomCode: this.roomCode?.value }
    //       })
    //       // console.log("this is roomCode", this.roomCode?.value)
    //     }else{
    //       alert(`Room doesn't exist. Create new.`)
    //     }
    //   }
    // })
    this.router.navigate(['/chat-room'],{
      queryParams: { roomCode: this.roomCode?.value }
    })
  }
}

createRoom(): void {
  if (this.form.valid) {
    console.log('Create Room clicked with code:', this.form.value.roomCode);
    this.dialogRef.close();
  }
}

isInvalid(controlName: string) {
  const control = this.form.get(controlName);
  return control && control.invalid && control.touched;
}

}
