import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonContent, IonList } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  @ViewChild(IonContent) contentArea: IonContent;
  @ViewChild(IonList, {read: ElementRef}) chatList: ElementRef;

  public chatMessage: string = '';
  private mutationObserver: MutationObserver;

  constructor(public dataService: DataService){

  }

  ngOnInit(){

    this.mutationObserver = new MutationObserver((mutations) => {
      this.contentArea.scrollToBottom(200);
    });

    this.mutationObserver.observe(this.chatList.nativeElement, {
      childList: true
    });

    this.dataService.getDocuments().then((data) => {
      console.log("chat loaded");
    }, (err) => {
      console.log(err);
    });

  }

  sendMessage(): void {

    if(this.dataService.user.fbid !== null){

      let message = {
        '_id': new Date().toJSON(),
        'fbid': this.dataService.user.fbid,
        'username': this.dataService.user.username,
        'picture': this.dataService.user.picture,
        'message': this.chatMessage
      };
  
      this.dataService.addDocument(message);
      this.chatMessage = '';

    }

  }

}