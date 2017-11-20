import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StompConfig, StompService } from '@stomp/ng2-stompjs'

import { ServerSocketService } from './services/server-socket.service';

import { AppComponent } from './app.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';

const routes: Routes = [
  { path: "chat-box", component: ChatBoxComponent }
]

const stompConfig: StompConfig = {
  // Which server?
  url: 'ws://localhost:8080/gs-guide-websocket/websocket',

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    login: 'guest',
    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};

@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ServerSocketService,
    StompService, 
    {
      provide: StompConfig,
      useValue: stompConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
