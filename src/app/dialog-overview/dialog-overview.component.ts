import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA,MatDialog,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogRef,MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog-overview',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,CommonModule,RouterModule],
  templateUrl: './dialog-overview.component.html',
  styleUrl: './dialog-overview.component.scss'
})
export class DialogOverviewComponent {
  form: FormGroup;
  createRoomDailog = false
  constructor(public dialogRef: MatDialogRef<DialogOverviewComponent>, private fb: FormBuilder,
    public router:Router
  ) {

    this.form = this.fb.group({
      roomCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get roomCode() {
    return this.form.get('roomCode');
  }

onClose(): void {
  this.dialogRef.close();
}

joinRoom(): void {
  this.router.navigateByUrl('/chat-room')
  this.dialogRef.close();
  if (this.form.valid) {
    console.log('Join Room clicked with code:', this.form.value.roomCode);
  }
}

createRoom(): void {
  if (this.form.valid) {
    console.log('Create Room clicked with code:', this.form.value.roomCode);
    this.dialogRef.close();
  }
}

}
