import {
    Component,
    Input,
    OnInit
}
from '@angular/core';


@Component({
    templateUrl: './parameters.component.html',
    selector: 'parameters-component'
})
export class ParametersComponent implements OnInit {
    private _paramsData = [];

    constructor() { /* empty block */ }
    ngOnInit() { /* empty block */ }


  get paramsData(): any[] {
    return this._paramsData;
  }

  @Input()
  set paramsData(value: any[]) {
    console.log(`Set parmasData ${value}`);
    value.forEach((a) => this._paramsData.push(a));
  }
}
