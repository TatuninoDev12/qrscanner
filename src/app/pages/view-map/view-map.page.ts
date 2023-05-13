import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { MapQrService } from 'src/app/services/map-qr.service';
import { UtilsService } from 'src/app/services/utils.service';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.page.html',
  styleUrls: ['./view-map.page.scss'],
})
export class ViewMapPage implements OnInit {

  clickGenerar = false;
  geo: any;
  finishSearch = true;
  locationName: any;

  constructor( private mapQR: MapQrService, 
               private modalCtrl: ModalController,
               private utils: UtilsService) { }

  ngOnInit() {
    this.mapQR.getMap();

    if(isPlatform('capacitor')) {
      window.addEventListener('keyboardDidHide', () => {
        this.finishSearch = this.mapQR.finishSearch;
      });
    } else {
      window.addEventListener('keydown', async (e) => {
        if(e.code === 'Enter') {
          this.finishSearch = this.mapQR.finishSearch;
        }
      });
      window.addEventListener('mouseup', async (e) => {
        this.finishSearch = this.mapQR.finishSearch;
      });
      window.addEventListener('touchcancel', async (e) => {
        this.finishSearch = this.mapQR.finishSearch;
      });

    }
  }

  closeModal() {
    if(this.clickGenerar){
      const data = [this.geo,this.locationName];
      this.modalCtrl.dismiss(data);
      this.clickGenerar = false;
    }else {
      this.modalCtrl.dismiss();
    }
    this.finishSearch = true;
  }

  generar() {
    this.clickGenerar = true;
    this.geo = this.mapQR.obtenerCordenadas();
    this.locationName = this.mapQR.obtenerLocationName();
    this.finishSearch = true;
    window.addEventListener('keyboardDidHide', () => {
      // Describe your logic which will be run each time keyboard is closed.
      this.finishSearch = this.mapQR.finishSearch;
    })
    const data = [this.geo,this.locationName]
    this.modalCtrl.dismiss(data);
  }

}
