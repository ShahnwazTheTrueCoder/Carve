import { Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HomeComponent } from './home/home.component';
import { DeveloperComponent } from './developer/developer.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo : 'home',
        pathMatch : 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'chat-room',
        component : ChatRoomComponent
    },
    {
        path: 'devloper',
        component : DeveloperComponent
    }
];
