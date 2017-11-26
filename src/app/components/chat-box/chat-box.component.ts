import { Component, OnInit } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs/Subscription';
import { MessageModel } from '../../models/Message';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  private receiver: string;
  private message: string;
  private messageThread: MessageModel[] = [];

  constructor(private _stompService: StompService,
              private _auth: AuthService) { }

  ngOnInit() {
    let stompSubscription = this._stompService.subscribe("/user/queue/message");
    stompSubscription.map((message: Message) => {
      return message.body;
    }).subscribe((body: string) => {
      if (body) {
        console.log(body)
        this.messageThread.push(JSON.parse(body));
      }
    })
  }

  sendMessage(event): void {
    console.log("Sending message");
    let message:MessageModel = {
      sender: this._auth.getUser().username,
      receiver: this.receiver,
      messageBody: this.message
    };
    console.log(JSON.stringify(message))
    this._stompService.publish("/app/message", JSON.stringify(message));
  }

  ngOnDestroy() {
    this._stompService.disconnect;
  }

}
