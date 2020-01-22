import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { MyBscCompModule } from 'my-bsc-comp';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyBscCompModule
  ],
  providers: [],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
      const custom = createCustomElement(AppComponent, { injector });

      customElements.define('mfe-activator', custom);
  }

  ngDoBootstrap() { }
}
