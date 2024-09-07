import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor(){}
  ngOnInit(){
    if(localStorage.getItem("user") == null){
      localStorage.setItem("user",window.prompt("Enter User Name"))
    }
  }
}
// localStorage.getItem('userName');