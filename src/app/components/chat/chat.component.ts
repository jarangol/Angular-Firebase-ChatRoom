import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
 
  message: string = "";
  element: any;

  constructor(public _cs: ChatService) { 
    this._cs.loadMessages()
      .subscribe( () => {
         this.element.scrollTop = this.element.scrollHeight;
      });
  }

  ngOnInit() {
    this.element = document.getElementById('app-messages');
  }

  sendMessage(){
    if(this.message.length === 0){
      return;
    }

    this._cs.addMessage(this.message)
      .then( () => this.message = "")
      .catch( (err) => console.error('Error sending', err));
  }

}
