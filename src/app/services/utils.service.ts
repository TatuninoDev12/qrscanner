import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor( private toast: ToastController) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async toastAlert( msg: string, color: string ) {
    const toast = await this.toast.create({
      message: msg,
      position: 'bottom',
      duration: 1500,
      color
    })
    await toast.present()
  }

}
