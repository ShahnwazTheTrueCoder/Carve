import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from '../main/main.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, MainComponent, HeaderComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
