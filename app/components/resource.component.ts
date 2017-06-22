import {
    Component,
    OnInit
}
from '@angular/core';
import {
    SpacesLoggingService,
    SpacesMessagesService
} from 'spaces-ng/dist/main';
import {
    TcGroupService,
    TcIndicatorService,
}
from 'threatconnect-ng/dist/main';

@Component({
    templateUrl: './app/components/resource.component.html',
    selector: 'resource-component'
})
export class ResourceComponent implements OnInit {
    contextData: string;
    firstRun: boolean = true;

    constructor(
        private logging: SpacesLoggingService,
        private messages: SpacesMessagesService,
        private tcGroup: TcGroupService,
        private tcIndicator: TcIndicatorService
    ) { /* empty block */ }
    ngOnInit() { /* empty block */ }

    public loadIndicator(id: string, type: string, owner: string): void {
        this.logging.debug('loadIndicator', '');
        if (this.firstRun) {
            this.firstRun = false;
            this.tcIndicator.getById(id, type, owner)
                .subscribe(
                    res => {
                        this.contextData = JSON.stringify(res, null, 4);
                        this.messages.showSuccess('Success', 'Loading Indicator');
                    },
                    err => {
                        this.logging.error('Error', err);
                        this.messages.showError('Failed', 'Loading Indicator');
                    }

                );
        }
    }

    public loadGroup(id: string, type: string, owner: string) {
        this.logging.debug('loadGroup', '');
        if (this.firstRun) {
            this.firstRun = false;
            this.tcGroup.getById(id, type, owner)
                .subscribe(
                    res => {
                        this.contextData = JSON.stringify(res, null, 4);
                        this.messages.showSuccess('Success', 'Loading Group');
                    },
                    err => {
                        this.logging.error('Error', err);
                        this.messages.showError('Failed', 'Loading Group');
                    }
                );
        }
    }
}
