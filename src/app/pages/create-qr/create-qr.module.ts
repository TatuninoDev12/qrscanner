import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQRPageRoutingModule } from './create-qr-routing.module';

import { CreateQRPage } from './create-qr.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQRPageRoutingModule,
    NgxQRCodeModule,
  ],
  declarations: [CreateQRPage]
})
export class CreateQRPageModule {}
