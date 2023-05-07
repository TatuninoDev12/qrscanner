import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
import { ViewMapPage } from '../view-map/view-map.page';
import { LoadingController } from '@ionic/angular';
import  getImageQR  from '../../services/getImageQR';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-create-qr',
  templateUrl: './create-qr.page.html',
  styleUrls: ['./create-qr.page.scss'],
})
export class CreateQRPage implements OnInit {

  qrdata: any;
  createCodeURL: any[] = [];
  createCodeGEO: any[] = [];
  createCodeWIFI: any[] = [];
  idURL = 0;
  idGEO = 0;
  idWIFI = 0;
  geo: any;
  load:any;
  locationName: any;
  elementType: 'url' | 'location' | 'wifi' = 'url';

  constructor(private storage: Storage,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private utils: UtilsService) { 
                this.cargarStorage();
              }

  ngOnInit() {
  }

  async location() {
    this.presentLoading();
    this.presentModal()
  }

  async presentLoading() {
    this.load = await this.loadingCtrl.create({
      translucent: true,
      cssClass: 'my-custom-class',
      spinner: 'lines',
      mode:'ios'
    });
    await this.load.present();
  }

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component: ViewMapPage
    });
    await modal.present();
    this.load.dismiss();
    modal.onWillDismiss().then(result => {
      if(result.data){
        this.geo = result.data[0];
        this.locationName = result.data[1];
        this.createGEO();
      }
    })
  }

  async createURL() {
    await this.createCodeURL;
    if(this.qrdata){
      this.idURL++;
      const exist = this.createCodeURL.find(reg => reg.id === this.idURL);
      const data = {
        id: this.idURL,
        qr: this.qrdata
      }
      this.createCodeURL.unshift(data);
      this.storage.set('URL_QR',this.createCodeURL);
      this.utils.toastAlert('Se creo el codio QR', 'success')      
    }
    this.qrdata = ''
  }

  async clearURL( data: any ) {
    await this.createCodeURL;
    this.idURL = data - 1;
    this.createCodeURL = this.createCodeURL.filter(reg => reg.id !== data);
    this.storage.set('URL_QR',this.createCodeURL);
    await this.utils.toastAlert('Se elimino el codio QR', 'danger')
  }

  async createGEO() {
    await this.createCodeGEO;
    const data = {
      id: this.idGEO,
      qr: this.geo,
      location: this.locationName
    }
    this.createCodeGEO.unshift(data);
    this.storage.set('GEO_QR',this.createCodeGEO);
    this.idGEO++;
    this.utils.toastAlert('Se creo el codio QR', 'success')
  }

  async clearGEO( data: any ) {
    await this.createCodeGEO;
    this.idGEO--;
    this.createCodeGEO = this.createCodeGEO.filter(reg => reg.id !== data);
    this.storage.set('URL_QR',this.createCodeGEO);
    await this.utils.toastAlert('Se elimino el codio QR', 'danger')
  }
  async cargarStorage() {
    await this.storage.create()
    this.createCodeURL = await this.storage.get('URL_QR') || [];
    this.idURL = this.createCodeURL.length;
    this.createCodeGEO = await this.storage.get('GEO_QR') || [];
    this.idGEO = this.createCodeGEO.length;
  }

  shared( data: any ) {
    // let imagesUlR: any;
    // imagesUlR = getImageQR(data);
    // this.socialSharing.share(
    //   '',
    //   '',
    //   imagesUlR
    // );

  }

}
