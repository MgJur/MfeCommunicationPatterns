import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MfeOneComponent } from './components/mfe1.component';
import { MfeTwoComponent } from './components/mfe2.component';
import { MfeThreeComponent } from './components/mfe3.component';

// Import Angular extensions elements
import { LazyElementsModule, LazyElementModuleOptions } from '@angular-extensions/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import NgRx store from nodemodules
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';



@NgModule({
  declarations: [
    AppComponent,
    MfeOneComponent,
    MfeTwoComponent,
    MfeThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyElementsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
