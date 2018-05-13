import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent, PatternSaveDialog} from './app.component';
import { MatGridListModule,
   MatButtonModule,
   MatInputModule,
   MatSelectModule,
   MatDialogModule,
   MatSnackBarModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './shared/services/api.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PatternSaveDialog
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [ApiService],
  entryComponents: [PatternSaveDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
