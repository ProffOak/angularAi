import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropZoneDirective} from './directives/drop-zone.directive';
import {DropZoneComponent} from './drop-zone/drop-zone.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    // Material Imports
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  declarations: [
    DropZoneDirective,
    DropZoneComponent
  ],
  exports:[
    DropZoneDirective,
    DropZoneComponent
  ]
})
export class SharedModule { }
