import { Component, OnInit } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs/Subscription';
import { Name } from '../../models/Name';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  private socketSubscription: Subscription;

  constructor(private _stompService: StompService) { }

  ngOnInit() {
    let name:Name = {
      name: "rick!!"
    }
    this._stompService.publish('/server/hello', JSON.stringify(name));

    let stomp_subscription = this._stompService.subscribe('/client/greetings');
    stomp_subscription.map((message: Message) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      console.log(`Received: ${msg_body}`);
    });
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }

}
