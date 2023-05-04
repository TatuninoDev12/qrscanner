
import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  stopActive = false

  constructor( private dataLocal: DataLocalService) {}

  ionViewEnter() {

  }

  ionViewWillEnter() {
  }

  scan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });
    
    // remove background
    BarcodeScanner.hideBackground();
    document.querySelector('ion-tab-bar')?.classList.add('disable-tab');
    document.querySelector('body')?.classList.add('scanner-active');

    this.stopActive = true;
    
  
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
  
    // if the result has content
    if (result.hasContent) {
      console.log(result); // log the raw scanned content
      this.dataLocal.saveRegister(result.format, result.content)
      document.querySelector('body')?.classList.remove('scanner-active');
      document.querySelector('ion-tab-bar')?.classList.remove('disable-tab');
      this.stopActive = false;
    }
  }

  stopScan = () => {
    this.stopActive = false;
    BarcodeScanner.showBackground();
    document.querySelector('body')?.classList.remove('scanner-active');
    document.querySelector('ion-tab-bar')?.classList.remove('disable-tab');
    BarcodeScanner.stopScan(); 
  };

  createQR() {
    
  }

}
