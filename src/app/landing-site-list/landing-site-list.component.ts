import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DatePipe } from "@angular/common";

import { LandingSite } from "../model/landing-site.model";

import { LandingSiteService } from "../services/landing-site.service";

@Component({
  selector: "landing-site-list",
  templateUrl: "landing-site-list.component.html",
  styleUrls: ["landing-site-list.component.css"]
})
export class LandingSiteListComponent {
  @Input() filteredLandingSites: LandingSite[];
  @Input() landingSiteCountUnfiltered?: number;
  @Input() selectedLandingSite: LandingSite;

  @Output()
  onSelectLandingSite: EventEmitter<LandingSite> = new EventEmitter<
    LandingSite
  >();

  constructor() {}

  private onSelect(ls: LandingSite): void {
    if (this.selectedLandingSite && this.selectedLandingSite == ls) {
      //unselect current row
      this.selectedLandingSite = undefined;
      this.onSelectLandingSite.emit(undefined);
    } else {
      this.selectedLandingSite = ls;
      this.onSelectLandingSite.emit(ls);
    }
  }
}
