import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject'
import { Observable } from 'rxjs/Observable'
import websocketConnect from 'rxjs-websockets'
import 'rxjs/add/operator/share'

@Injectable()
export class ServerSocketService {
  private inputStream: QueueingSubject<string>;
  public messages: Observable<string>

  public connect() {
    if (!this.messages) {
      return this.messages = websocketConnect(
        "http://localhost:8080/app/hello",
        this.inputStream = new QueueingSubject<string>()
      ).messages.share()
    } else {
      return this.messages;
    }
  }
  public send(message: string): void {
    this.inputStream.next(JSON.stringify(message));
  }

  constructor() { }

}
