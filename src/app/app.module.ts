import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { MainBackgroundModule } from './pages/main-background/main-background.module';
import { AllEventsComponent } from './pages/all-events/all-events.component';

@NgModule({
  declarations: [AppComponent, AllEventsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainBackgroundModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
