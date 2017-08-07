import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from "@angular/core";

import { LandingSiteFilterInfo } from "../model/landing-site-filter-info.model";

@Component({
  selector: "landing-site-filter",
  templateUrl: "landing-site-filter.component.html",
  styleUrls: ["landing-site-filter.component.css"]
})
export class LandingSiteFilterComponent {
  @Input() filterInfo: LandingSiteFilterInfo;
  @Input() massSliderConfig: any;
  @Input() yearSliderConfig: any;
  @Input() namesSearchSource: string[];
  @Input() classSearchSource: string[];

  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();

  filterChange(): void {
    this.onFilterChange.emit();
  }
}
