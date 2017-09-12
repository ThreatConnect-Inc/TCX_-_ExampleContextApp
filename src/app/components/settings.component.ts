import {
    Component,
    OnInit
}
from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
    templateUrl: './settings.component.html',
    selector: 'settings-component'
})
export class SettingsComponent {
    constructor(
      public settings: SettingsService
    ) { /* empty block */ }

}
