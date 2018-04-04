import {
    Component
} from '@angular/core';

import { SettingsService } from '../../services/settings.service';

@Component({
    templateUrl: './settings.component.html',
    selector: 'tc-context-settings'
})
export class SettingsComponent {
    constructor(
        private settings: SettingsService
    ) { /* empty block */ }

    get savedSettings(): string {
      return this.settings.savedSettings;
    }

    set savedSettings(settings: string) {
      this.settings.savedSettings = settings;
    }

    loadSettings() {
      this.settings.load();
    }

    saveSettings() {
      this.settings.save();
    }
}
