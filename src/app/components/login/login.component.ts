import { Component, OnInit } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs/Subscription'

import { UserLogin } from '../../models/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socketSubscription: Subscription;
  username:string;
  password:string;
  constructor(private _stompService:StompService) { }

  ngOnInit() {
  }

  login() {
    alert(this.username);
    alert(this.password)
    if (this.username && this.password) {
      let userLogin:UserLogin = {
        username: this.username,
        password: this.password
      }
      
      this._stompService.publish('/server/login', JSON.stringify(userLogin));

      let stomp_subscription = this._stompService.subscribe('client/login');
      stomp_subscription.map((message:Message) => {
        return message.body
      }).subscribe((body:string) => {
        console.log(body)
      })
    }
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }
}
