import { Component, Input } from "@angular/core";

import { LandingSite } from "../model/landing-site.model";

@Component({
  selector: "landing-site-map",
  templateUrl: "./landing-site-map.component.html",
  styleUrls: ["./landing-site-map.component.css"]
})
export class LandingSiteMapComponent {
  @Input() filteredLandingSites: LandingSite[];
  @Input() selectedLandingSite: LandingSite;

  lat: number = 39.14974603109249;
  lng: number = -105.68359375;
  zoom: number = 7;
}
