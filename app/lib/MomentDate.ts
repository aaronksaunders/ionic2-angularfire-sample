
import {Pipe} from '@angular/core';
import * as moment from 'moment';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'MomentDate'
})
export class MomentDate {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, args?) {
    // see http://momentjs.com/docs/#/displaying/ for information
    // on formatting the date using moment
    return moment(value).format(args[0])
  }

}