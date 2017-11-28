import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2Webstorage } from 'ngx-webstorage';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatButtonModule, MatChipsModule, MatListModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { StompConfig, StompService } from '@stomp/ng2-stompjs'

import { ServerSocketService } from './services/server-socket.service';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { LoginComponent } from './components/login/login.component';
import { OnlineListComponent } from './components/online-list/online-list.component';

const routes: Routes = [
  { path: "chat-box", component: ChatBoxComponent },
  { path: "login", component: LoginComponent },
  { path: "chat", component: OnlineListComponent },
]

const stompConfig: StompConfig = {
  url: 'ws://localhost:8080/gs-guide-websocket/websocket',
  // Typical keys: login, passcode, host
  headers: {
    login: null,
    passcode: null
  },
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  reconnect_delay: 5000,
  debug: true
};

@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent,
    LoginComponent,
    OnlineListComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    Ng2Webstorage,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ServerSocketService,
    StompService, 
    {
      provide: StompConfig,
      useValue: stompConfig
    },
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
