import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,MatFormFieldModule, MatInputModule, MatButtonModule,MatMenuModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public dialog: MatDialog, private router: Router,) {}

  openDialog(): void {
    this.dialog.open(DialogOverviewComponent,{
      width:'600px',height:'350px'
    });
  }

  leaveChat() {
    this.router.navigate(['/devloper']); 
  }
}


