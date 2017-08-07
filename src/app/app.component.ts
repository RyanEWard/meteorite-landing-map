import { Component, OnInit } from "@angular/core";

import { LandingSite } from "./model/landing-site.model";
import { LandingSiteFilterInfo } from "./model/landing-site-filter-info.model";
import { LandingSiteService } from "./services/landing-site.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [LandingSiteService]
})
export class AppComponent implements OnInit {
  landingSiteCountUnfiltered?: number;

  filteredLandingSites: LandingSite[];
  selectedLandingSite?: LandingSite;

  filterInfo: LandingSiteFilterInfo;

  namesSearchSource: string[];
  classSearchSource: string[];

  massSliderConfig: any;
  yearSliderConfig: any;

  constructor(private landingSiteService: LandingSiteService) {}

  ngOnInit(): void {
    this.namesSearchSource = [];
    this.classSearchSource = [];
    this.setInitialFilterInfo();
    this.setSliderConfig();
    this.getFilteredLandingSites();
  }

  private getFilteredLandingSites(): void {
    this.landingSiteService
      .getFilteredLandingSites(this.filterInfo)
      .subscribe(landingSites => {
        landingSites.sort(
          //sort by name
          (ls1: LandingSite, ls2: LandingSite) =>
            ls1.name.localeCompare(ls2.name)
        );
        this.filteredLandingSites = landingSites;
        if (!this.landingSiteCountUnfiltered) {
          //retreiving landingSite list for first time, set unfiltered count and search sources
          this.landingSiteCountUnfiltered = this.filteredLandingSites.length;
          this.setSearchSources();
        }
      });
  }

  updateFilter(): void {
    this.getFilteredLandingSites();
    if (
      this.selectedLandingSite &&
      !this.filteredLandingSites.includes(this.selectedLandingSite)
    ) {
      //filtered out selectedLandingSite, so reset it
      this.selectedLandingSite = undefined;
    }
  }

  changeSelectedLandingSite(ls: LandingSite): void {
    this.selectedLandingSite = ls;
  }

  private setSearchSources(): void {
    this.namesSearchSource = this.filteredLandingSites.map(
      (ls: LandingSite) => (ls.name ? ls.name : null)
    );
    this.namesSearchSource = Array.from(new Set(this.namesSearchSource));

    this.classSearchSource = this.filteredLandingSites.map(
      (ls: LandingSite) => (ls.recclass ? ls.recclass : null)
    );
    this.classSearchSource = Array.from(new Set(this.classSearchSource));
    this.classSearchSource.sort((s1: string, s2: string) =>
      s1.localeCompare(s2)
    );
  }

  private setInitialFilterInfo(): void {
    this.filterInfo = {
      name: "",
      classification: "",
      yearRange: [1850, 2017],
      massRange: [0, 500000]
    };
  }

  private setSliderConfig(): void {
    this.massSliderConfig = {
      behaviour: "drag",
      connect: true,
      tooltips: [true, true],
      step: 10000,
      range: {
        min: 0,
        max: 350000
      },
      pips: {
        mode: "values",
        values: [0, 350000],
        density: 4,
        stepped: true
      }
    };

    this.yearSliderConfig = {
      behaviour: "drag",
      connect: true,
      tooltips: [true, true],
      step: 10,
      range: {
        min: 1850,
        max: 2017
      },
      pips: {
        mode: "values",
        values: [1850, 2017],
        density: 4,
        stepped: true
      }
    };
  }
}
