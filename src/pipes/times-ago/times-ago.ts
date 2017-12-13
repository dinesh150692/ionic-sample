import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TimesAgoPipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'timesAgo',
})
export class TimesAgoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    var result;
    const createdDate = this.fixDateForSafari(value);
    const createdAt = createdDate.getTime();
    const now = new Date();
    var secs = now.getTime() - createdAt;
    secs = secs/1000;
    Math.floor(secs);
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    if (minutes < 1) {
        return secs + 'secs ago';
    }
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
        return minutes + 'mins ago';
    }
    var days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
        return hours + 'hrs ago';
    }
    if (createdDate.getFullYear() == now.getFullYear()) {
      result = createdDate.toLocaleDateString('en-GB', {
        day : 'numeric',
        month : 'short',
      }).split(' ').join(' ');
      return result;
    } else {
      result = createdDate.toLocaleDateString('en-GB', {
        day : 'numeric',
        month : 'short',
        year: 'numeric'
      }).split(' ').join(' ');
      return result;
    }
  }

  fixDateForSafari(dateString) {
    var a = dateString.split(/[^0-9]/);
    return new Date(Date.UTC(a[0],a[1]-1,a[2],a[3],a[4],a[5]));
  }

}
