import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MfeOneComponent } from './components/mfe1.component';
import { MfeTwoComponent } from './components/mfe2.component';
import { MfeThreeComponent } from './components/mfe3.component';

// axLazyElement for Webcomponents
import { LazyElementsModule, LazyElementModuleOptions } from '@angular-extensions/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * Publisher Subscriber - Service from https://www.npmjs.com/package/@pscoped/ngx-pub-sub
 * implements RxJs Observables -> registers event and emits them to subscriber
 */
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';


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
    NgxPubSubModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
