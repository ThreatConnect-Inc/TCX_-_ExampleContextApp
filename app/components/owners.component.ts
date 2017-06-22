import {
    Component,
    OnInit
}
from '@angular/core';
import {
    SpacesLoggingService,
    SpacesMessagesService
} from 'spaces-ng/dist/main';
import { TcOwnerService, } from 'threatconnect-ng/dist/main';

@Component({
    templateUrl: './app/components/owners.component.html',
    selector: 'owners-component',
})
export class OwnersComponent implements OnInit {
    contextData: string;
    firstRun: boolean = true;

    constructor(
        private logging: SpacesLoggingService,
        private messages: SpacesMessagesService,
        private tcOwner: TcOwnerService
    ) { /* empty block */ }

    ngOnInit() { /* empty block */ }

    public loadOwners(id: string, type: string): void {
        this.logging.debug('loadOwners', '');
        if (this.firstRun) {
            this.firstRun = false;
            this.tcOwner.getByIndicator(id, type)
                .subscribe(
                    res => {
                        this.contextData = JSON.stringify(res, null, 4);
                        this.messages.showSuccess('Success', 'Loading Owner');
                    },
                    err => {
                        this.logging.error('Error', err);
                        this.messages.showError('Failed', 'Loading Owner');
                    }
                );
        }
    }
}
