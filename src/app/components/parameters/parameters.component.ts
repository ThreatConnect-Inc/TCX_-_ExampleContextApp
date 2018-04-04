import {
    Component
} from '@angular/core';
import { SpacesBaseService } from 'spaces-ng';


@Component({
    templateUrl: './parameters.component.html',
    selector: 'tc-context-parameters'
})
export class ParametersComponent {
    private _parameters: any[] = [];


    constructor(
      private spacesBaseSerivce: SpacesBaseService
    ) {
      /* build param data */
      for (const name in this.spacesBaseSerivce.params) {
        if (this.spacesBaseSerivce.params.hasOwnProperty(name)) {
          this._parameters.push({
            'name': name,
            'value': this.spacesBaseSerivce.params[name]
          });
        }
      }
    }

    get parameters(): any[] {
      return this._parameters;
    }
}
