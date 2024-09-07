import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Messaging-app';
  constructor(@Inject(PLATFORM_ID) private platformId: any){}
  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      if(localStorage.getItem("user") == null){
        localStorage.setItem("user",window.prompt("Enter User Name"))
      }
    }
  }
}
// localStorage.getItem('userName');