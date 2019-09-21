import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  private loading;

  constructor(
    private facebook: Facebook, 
    private menu: MenuController, 
    private navCtrl: NavController,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    private dataService: DataService
  ){

  }

  ngOnInit(){

    this.menu.enable(false);

  }

  login(): void {

    this.loadingCtrl.create({
      message: 'Authenticating...',
    }).then((overlay) => {
      
      this.loading = overlay;
      this.loading.present();

      this.facebook.login(['public_profile']).then((response) => {

        this.getProfile();
  
      }, (err) => {
  
        this.alertCtrl.create({
          header: 'Oops!',
          message: 'Something went wrong, please try again later.',
          buttons: ['Ok']
        }).then((alert) => {
          this.loading.dismiss();
          alert.present();
        });
  
      });

    });

  }

  getProfile(): void {

    this.facebook.api('/me?fields=id,name,picture', ['public_profile']).then(

      (response) => {

        console.log(response);

        this.dataService.user.fbid = response.id;
        this.dataService.user.username = response.name;
        this.dataService.user.picture = response.picture.data.url;

        this.loading.dismiss().then(() => {
          this.menu.enable(true);
          this.navCtrl.navigateRoot('/home');
        });

      }, 

      (err) => {

        console.log(err);

        this.alertCtrl.create({
          header: 'Oops!',
          message: 'Something went wrong, please try again later.',
          buttons: ['Ok']
        }).then((alert) => {
          this.loading.dismiss();
          alert.present();
        });

      }

    );

  }

}