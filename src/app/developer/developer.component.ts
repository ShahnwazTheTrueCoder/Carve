import { Component } from '@angular/core';
import { DeveloperHeaderComponent } from "../developer-header/developer-header.component";

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [DeveloperHeaderComponent],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.scss'
})
export class DeveloperComponent {

}
