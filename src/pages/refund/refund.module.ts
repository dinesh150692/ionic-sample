import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefundPage } from './refund';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    RefundPage,
  ],
  imports: [
    IonicPageModule.forChild(RefundPage),
    PipesModule
  ],
})
export class RefundPageModule {}
