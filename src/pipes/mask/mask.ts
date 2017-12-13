import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MaskPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'mask',
})
export class MaskPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    var result = value.slice(0,2)+'xxxxxx'+value.slice(8,10);
    return result;
  }
}
