import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';

interface Message {
  _id?: string;
  username: string;
  message: string;
  picture: string;  
}

interface UserData {
  fbid: number;
  username: string;
  picture: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: UserData = {
    fbid: null,
    username: null,
    picture: null
  }
  
  public messages: Message[] = [];

  private db: any;
  private cloudantUsername: string;
  private cloudantPassword: string;
  private remote: string;

  constructor(){

    // IMPORTANT: This is just a simple implementation example for a publicly accessible database. The username and password used here should be an API key
    // provided by cloudant (not your account username and password). Any key that is stored inside of your Javascript code is accessible to everybody, so you should
    // never put any sensitive information your client side code.
    // Implementing a database that is secure/not publicly accessible will require you to use your own proxy server to hide these details (this is much more advanced).

    this.db = new PouchDB('camperchat');
    this.cloudantUsername = 'YOUR API KEY USERNAME'; // NOT your account username
    this.cloudantPassword = 'YOUR API KEY PASSWORD'; // NOT your account password
    this.remote = 'https://YOUR-CLOUDANT-URL.cloudant.com/camperchat';

    //Set up PouchDB
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.cloudantUsername,
        password: this.cloudantPassword
      }
    };

    this.db.sync(this.remote, options);

  }

  addDocument(message): void {
    this.db.put(message);
  }

  getDocuments(): Promise<any> {

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true,
        limit: 30,
        descending: true

    }).then((result) => {

        this.messages = [];

        let docs = result.rows.map((row) => {
          this.messages.push(row.doc);
        });

        this.messages.reverse();

        resolve(this.messages);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
       });

      }).catch((error) => {

        console.log(error);

      }); 

    });

  }

  handleChange(change): void {

    let changedDoc = null;
    let changedIndex = null;

    this.messages.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.messages.splice(changedIndex, 1);
    } 
    else {

      //A document was updated
      if(changedDoc){
        this.messages[changedIndex] = change.doc;
      } 

      //A document was added
      else {
        this.messages.push(change.doc); 
      }

    }


  }

}