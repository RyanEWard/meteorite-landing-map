import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

import { LandingSite } from "../model/landing-site.model";
import { LandingSiteFilterInfo } from "../model/landing-site-filter-info.model";

@Injectable()
export class LandingSiteService {
  private dataUrl: string = "https://data.nasa.gov/resource/y77d-th95.json";
  private parameterString: string = "?$where=within_box(GeoLocation,41.0035, -102.0415, 36.9923, -109.0604)"; //NW and SE corners of Colorado
  private headers: Headers;

  landingSites: LandingSite[];

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Accept", "application/json");
  }

  getFilteredLandingSites(
    fi: LandingSiteFilterInfo
  ): Observable<LandingSite[]> {
    return this.getLandingSites().map((landingSites: LandingSite[]) =>
      this.filterLandingSites(fi, landingSites)
    );
  }

  private getLandingSites(): Observable<LandingSite[]> {
    if (this.landingSites) {
      return Observable.of(this.landingSites);
    } else {
      return this.http
        .get(this.dataUrl + this.parameterString, {
          headers: this.headers
        })
        .map((res: Response) => res.json() as LandingSite[])
        .do((data: LandingSite[]) => (this.landingSites = data))
        .catch((error: any) =>
          Observable.throw(
            error.json().error ||
              "Error retreiving data from " +
                this.dataUrl +
                this.parameterString
          )
        );
    }
  }

  private filterLandingSites(
    fi: LandingSiteFilterInfo,
    landingSites: LandingSite[]
  ): LandingSite[] {
    return landingSites.filter((ls: LandingSite) => {
      return (
        this.nameMatchesFilter(fi, ls) &&
        this.classMatchesFilter(fi, ls) &&
        this.checkYearFilter(fi, ls) &&
        this.checkMassFilter(fi, ls)
      );
    });
  }

  private nameMatchesFilter(
    fi: LandingSiteFilterInfo,
    ls: LandingSite
  ): boolean {
    return this.checkStringContainment(ls.name, fi.name);
  }

  private classMatchesFilter(
    fi: LandingSiteFilterInfo,
    ls: LandingSite
  ): boolean {
    return this.checkStringContainment(ls.recclass, fi.classification);
  }

  private checkYearFilter(fi: LandingSiteFilterInfo, ls: LandingSite): boolean {
    return (
      !ls.year ||
      this.checkBoundsContainment(new Date(ls.year).getFullYear(), fi.yearRange)
    );
  }

  private checkMassFilter(fi: LandingSiteFilterInfo, ls: LandingSite): boolean {
    return this.checkBoundsContainment(ls.mass, fi.massRange);
  }

  private checkStringContainment(s1?: string, s2?: string): boolean {
    return (
      !s1 || !s2 || s1.toLocaleLowerCase().includes(s2.toLocaleLowerCase())
    );
  }

  private checkBoundsContainment(n?: number, range?: number[]): boolean {
    return !n || !range || (n >= range[0] && n <= range[1]);
  }
}
