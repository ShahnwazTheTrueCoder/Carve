import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule,MatDividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
