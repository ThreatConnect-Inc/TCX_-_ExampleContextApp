import {
    Component,
    Input,
    OnInit
} from '@angular/core';


@Component({
    templateUrl: './parameters.component.html',
    selector: 'tc-context-parameters'
})
export class ParametersComponent implements OnInit {
    @Input() paramsData: any;

    constructor() { /* empty block */ }
    ngOnInit() { /* empty block */ }
}
