import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AgmCoreModule } from "@agm/core";

import { NouisliderModule } from "ng2-nouislider";

import { Ng2AutoCompleteModule } from "ng2-auto-complete";

import { AppComponent } from "./app.component";
import { TitleBarComponent } from "./title-bar/title-bar.component";
import { LandingSiteListComponent } from "./landing-site-list/landing-site-list.component";
import { LandingSiteFilterComponent } from "./landing-site-filter/landing-site-filter.component";
import { LandingSiteMapComponent } from "./landing-site-map/landing-site-map.component";

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    LandingSiteListComponent,
    LandingSiteFilterComponent,
    LandingSiteMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NouisliderModule,
    HttpModule,
    Ng2AutoCompleteModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC_yI8qRbwkpAmCdOyyJcQVBOG7x1F-nY8"
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
