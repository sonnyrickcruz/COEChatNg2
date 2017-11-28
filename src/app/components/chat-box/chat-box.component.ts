import { Component, OnInit, Input } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs/Subscription';
import { MessageModel } from '../../models/Message';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() receiver: string;
  private message: string;
  private messageThread: MessageModel[] = [];
  private currentUser: User;

  constructor(private _stompService: StompService,
    private _auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this._auth.getUser();
    console.log("current user: " + JSON.stringify(this.currentUser))
    let stompSubscription = this._stompService.subscribe("/user/queue/message");
    stompSubscription.map((message: Message) => {
      return message.body;
    }).subscribe((body: string) => {
      let message:MessageModel = JSON.parse(body)
      if (message && message.receiver != message.sender) {
        console.log(body)
        this.messageThread.push(JSON.parse(body));
      }
    })
  }

  sendMessage(event): void {
    console.log("Sending message");
    let message: MessageModel = {
      sender: this._auth.getUser().username,
      receiver: this.receiver,
      messageBody: this.message
    };
    this.messageThread.push(message);
    this.message = "";
    console.log(JSON.stringify(message))
    this._stompService.publish("/app/message", JSON.stringify(message));
  }

  ngOnDestroy() {
    //this._stompService.disconnect;
  }

}
