import {
    Component,
    OnInit
}
from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
    templateUrl: './app/components/settings.component.html',
    selector: 'settings-component'
})
export class SettingsComponent implements OnInit {
    constructor(
        private settings: SettingsService
    ) { /* empty block */ }
    ngOnInit() { /* empty block */ }
}