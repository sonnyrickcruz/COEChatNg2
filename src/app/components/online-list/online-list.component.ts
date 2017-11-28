import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-online-list',
  templateUrl: './online-list.component.html',
  styleUrls: ['./online-list.component.css']
})
export class OnlineListComponent implements OnInit {
  users: User[] = [];
  currentReciever: string;

  constructor(private _auth: AuthService,
    private _stompService: StompService) { }

  ngOnInit() {
    this._stompService.publish('/app/online', '');
    let stomp_subscription = this._stompService.subscribe('/user/client/online');
    stomp_subscription.map((message: Message) => {
      return message.body
    }).subscribe((body: string) => {
      console.log("online");
      console.log(body)
      this.users = JSON.parse(body);
    })
  }

  onDestroy() {
    alert("Disconnect")
    this._stompService.disconnect();
  }

  openUser(user: User): void {
    this.currentReciever = user.username;
  }

}
