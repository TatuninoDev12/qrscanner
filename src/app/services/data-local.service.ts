import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Storage } from '@ionic/storage-angular';
import { AlertController, NavController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  saved: Register[] = [];

  constructor(private storage: Storage,
              private navCtrl: NavController,
              private alert: AlertController) {
    this.loadStorage();
  }

  async loadStorage () {
    await this.storage.create()
    this.saved = (await this.storage.get('register')) || [];
  }

  async saveRegister( format: string, text: string ) {
    await this.loadStorage();
    const newRegister = new Register( format, text )
    this.saved.unshift( newRegister )
    this.storage.set('register', this.saved)
  }

  async presentAlert( message: string ) {
    const alert = await this.alert.create({
      header: 'Texto del QR',
      message,
      buttons: ['OK'],
      animated: true,
    })
    await alert.present();
  }


  async openRegister( register: Register ) {
    console.log(register.type, register );
    
    this.navCtrl.navigateForward('/tabs/tab2')
    switch( register.type ) {
      case 'http':
        Browser.open({url: register.text})
        break
      case 'geo' :
        this.navCtrl.navigateForward(`/tabs/tab2/map/${register.text}`)
        break;
      
      default:
        this.presentAlert(register.text)
    }
  }

  deleteRegister( registro: Register ) {
    this.saved = this.saved.filter( reg => !(reg.text === registro.text && reg.created === registro.created) );
    this.storage.set('register', this.saved);
  }

  

}
