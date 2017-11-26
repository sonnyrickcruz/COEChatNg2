import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/UserLogin';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private _stompService: StompService,
              private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    let stomp_subscription = this._stompService.subscribe('/client/login');
    stomp_subscription.map((message: Message) => {
      return message.body
    }).subscribe((body: string) => {
      console.log(body)
      let user:User = JSON.parse(body);
      if (user) {
        this._auth.setUser(user);
        if (this._auth.getUser()) {
          this._router.navigate(['/chat-box']);
        }
      }
    })
  }

  login() {
    console.log(this.username);
    console.log(this.password);
    if (this.username && this.password) {
      let userLogin: UserLogin = {
        username: this.username,
        password: this.password
      }

      this._stompService.publish('/app/login', JSON.stringify(userLogin));
    }
  }

  ngOnDestroy() {
    this._stompService.disconnect();
  }
}
