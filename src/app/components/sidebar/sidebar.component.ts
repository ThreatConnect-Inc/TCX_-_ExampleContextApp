import {
    Component,
    Input,
    OnInit
}
from '@angular/core';
import { Router } from '@angular/router';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesMessagesService,
    SpacesStorageService
} from 'spaces-ng/';

@Component({
    templateUrl: './sidebar.component.html',
    selector: 'tc-context-sidebar'
})
export class SidebarComponent implements OnInit {
    @Input() sidebarState: boolean;

  pinnedIcon = 'fa-toggle-off';
  visible: boolean;

    private pinned = false;
    private visibleIcon = 'fa-chevron-right';
    private routes: any[];

    constructor(
        private logging: SpacesLoggingService,
        private messages: SpacesMessagesService,
        private router: Router,
        private spacesBase: SpacesBaseService,
        private storage: SpacesStorageService
    ) { /* empty block */ }

    ngOnInit(): void {
        this.visible = this.sidebarState;

        this.spacesBase.initialized.then(() => {
            this.routes = this.storage.read('routes');
        });
    }

    public toggleSidebar(): void {
        this.visible = !this.visible;
        if (this.visible) {
            this.visibleIcon = 'fa-chevron-left';
        } else {
            this.visibleIcon = 'fa-chevron-right';
        }
    }

    public togglePinned(): void {
        this.pinned = !this.pinned;
        if (this.pinned) {
            this.pinnedIcon = 'fa-toggle-on';
        } else {
            this.pinnedIcon = 'fa-toggle-off';
        }
    }

    /* example of ng2-spaces message feature */
    public errorMessage(msg) {
        this.logging.debug('msg', msg);
        this.messages.showError('Error Message', msg);

        // toggle sidebar if not pinned
        if (!this.pinned) {
            this.toggleSidebar();
        }
    }

    /* example of changing route */
    public goTo(route) {
        this.logging.debug('route', route);
        this.router.navigate([route]);

        // toggle sidebar if not pinned
        if (!this.pinned) {
            this.toggleSidebar();
        }
    }

    /* example of ng2-spaces message feature */
    public successMessage(msg) {
        this.logging.debug('msg', msg);
        this.messages.showSuccess('Success Message', msg);

        // toggle sidebar if not pinned
        if (!this.pinned) {
            this.toggleSidebar();
        }
    }
}
