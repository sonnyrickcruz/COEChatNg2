import { Component, OnInit } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs'
import { Message } from '@stomp/stompjs'
import { Subscription } from 'rxjs/Subscription';
import { Name } from '../../models/Name'

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  private socketSubscription: Subscription;

  constructor(private _stompService: StompService) { }

  ngOnInit() {
    let stomp_subscription = this._stompService.subscribe('/topic/greetings');
    let name:Name = {
      name: "rick!!"
    }
    let x = this._stompService.publish('/app/hello', JSON.stringify(name));

    stomp_subscription.map((message: Message) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      console.log(`Received: ${msg_body}`);
    });

    console.log(x)
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }

}
