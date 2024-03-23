import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimersPage } from './timers.page';

import { TimersPageRoutingModule } from './timers-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TimersPageRoutingModule
  ],
  declarations: [TimersPage]
})
export class TimersPageModule {}
