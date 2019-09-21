import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MenuController, NavController } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { DataService } from './services/data.service';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private facebook: Facebook,
    private dataService: DataService) {

    SplashScreen.hide().catch((err) => {
      console.warn(err);
    });

    StatusBar.hide().catch((err) => {
      console.warn(err);
    });

  }

  logout(): void {

    this.menu.close();
    this.menu.enable(false);

    this.dataService.user.fbid = null;
    this.dataService.user.username = null;
    this.dataService.user.picture = null;

    this.facebook.logout();
    this.navCtrl.navigateRoot('/login');

  }

}