import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { map } from "rxjs/operators";
import { auth } from 'firebase/app';

import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];  
  public user: any = {};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      if(!user){
        return;
      }

      this.user.name = user.displayName;
      this.user.uid = user.uid;
      
    })
  }
  
  login(providerName: string) {
    let provider;
    
    if(providerName === 'google'){
      provider = new auth.GoogleAuthProvider();
    }else{
      provider = new auth.TwitterAuthProvider();
    }
    
    this.afAuth.auth.signInWithPopup(provider);
  }
  
  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
  }

  loadMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date','desc')
                                                                              .limit(5));
    return this.itemsCollection.valueChanges()
                            .pipe(

                              map( (messages: Message[]) => {
                                  this.chats = [];

                                  for(let message of messages){
                                    this.chats.unshift(message);
                                  }
                                  return this.chats;
                                })
                            )                            
  }

  addMessage(text: string){
    let message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    }
    
    return this.itemsCollection.add(message);

  }
}
