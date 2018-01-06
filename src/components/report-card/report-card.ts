import { Component, Input } from '@angular/core';

/**
 * Generated class for the ReportCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'report-card',
  templateUrl: 'report-card.html'
})
export class ReportCardComponent {
  @Input('lists') lists: any;
  
  constructor() {
  }
  ngOnInit() {
  }
}
