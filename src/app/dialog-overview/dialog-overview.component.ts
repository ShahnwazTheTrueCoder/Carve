import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA,MatDialog,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogRef,MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-overview',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,],
  templateUrl: './dialog-overview.component.html',
  styleUrl: './dialog-overview.component.scss'
})
export class DialogOverviewComponent {
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<DialogOverviewComponent>, private fb: FormBuilder,) {

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
  if (this.form.valid) {
    console.log('Join Room clicked with code:', this.form.value.roomCode);
    this.dialogRef.close();
  }
}

createRoom(): void {
  if (this.form.valid) {
    console.log('Create Room clicked with code:', this.form.value.roomCode);
    this.dialogRef.close();
  }
}

}
