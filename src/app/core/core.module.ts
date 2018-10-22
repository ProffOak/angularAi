import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule} from '@angular/material';
import {SnackBarService} from './snack-bar/snack-bar.service';
import {MobileNetService} from './mobile-net/mobile-net.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
  ],
  providers: [SnackBarService, MobileNetService],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class CoreModule { }
