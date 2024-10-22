import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [],
  imports: [CommonModule,RouterOutlet, FooterComponent, MainComponent, HeaderComponent, MatIconModule,MatButtonModule],
})
export class AppModule { }
