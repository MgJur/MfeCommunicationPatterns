import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MfeOneComponent } from './components/mfe1.component';
import { MfeTwoComponent } from './components/mfe2.component';
import { MfeThreeComponent } from './components/mfe3.component';

import { LazyElementsModule, LazyElementModuleOptions } from '@angular-extensions/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { AppComponent } from 'projects/mfe1/src/app/app.component';

// pre-configured LazyElementsModule
// const options: LazyElementModuleOptions = {
//   elementConfigs: [
//     { tag: 'mfe-activator', url: 'http://localhost:8080/mfe1/main-es2015.js' },
//     { tag: 'mfe-picker', url: 'http://localhost:8080/mfe2/main-es2015.js' },
//     { tag: 'mfe-finder', url: 'http://localhost:8080/mfe3/main-es2015.js' }
//   ]
// };


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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
