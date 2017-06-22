import {
    Component,
    Input,
    OnInit
}
from '@angular/core';


@Component({
    templateUrl: './app/components/parameters.component.html',
    selector: 'parameters-component'
})
export class ParametersComponent implements OnInit {
    @Input() paramsData: any;

    constructor() { /* empty block */ }
    ngOnInit() { /* empty block */ }
}