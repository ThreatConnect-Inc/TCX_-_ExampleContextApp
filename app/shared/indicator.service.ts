import {
    Injectable
}
from '@angular/core';

import {
    Growl,
    Message
}
from 'primeng/primeng';

import {
    SpacesLoggingService
}
from 'spaces-ng/dist/main';

import {
    TcIndicatorService
}
from 'threatconnect-ng/dist/main';


@Injectable()
export class SettingsService {
    private msgs: Message[] = [];
    private domain: string = 'local';  // system, organization, local
    private searchCommand: string = '1';
    private typeName: string = 'sampleApp-settings';
    public savedSettings: any;

    constructor(
        private exchangeDB: TcIndicatorService,
        private logging: SpacesLoggingService
    ) { /* empty block */ }

    // public load(
    //     domain: string = this.domain,
    //     typeName: string = this.typeName,
    //     searchCommand: string = this.searchCommand) {
    //     /*
    //      * Load settings from Data Store
    //      */
    //     console.log('settings.service:load');
    //     this.msgs = [];

    //     this.exchangeDB.read(domain, typeName, searchCommand)
    //         .then(response => {
    //             // console.log('settings.service:load:response', response);
    //             let savedSettings = response._source || {};
    //             this.savedSettings = JSON.stringify(savedSettings);

    //             this.msgs.push({
    //                 severity: 'info',
    //                 summary: 'Success',
    //                 detail: 'Loading Settings'
    //             });

    //             if (Object.getOwnPropertyNames(this.savedSettings).length === 0) {
    //                 this.init();
    //             }
    //             console.log('settings.service:load:savedSettings',
    //                 JSON.stringify(this.savedSettings, null, 4));
    //         })
    //         .catch((error) => {
    //             this.handleAjaxError(error, 'Loading Settings');
    //         });
    // }

    // public save() {
    //     /*
    //      * Save configuration
    //      */
    //     console.log('settings.service:save');
    //     this.msgs = [];

    //     this.exchangeDB.update(this.domain, this.typeName, this.searchCommand,
    //         this.savedSettings)
    //             .then(response => {
    //                 /* bcs - check response status */
    //                 this.msgs.push({
    //                     severity: 'info',
    //                     summary: 'Success',
    //                     detail: 'Saving Settings'
    //                 });
    //             })
    //             .catch((error) => {
    //                 this.handleAjaxError(error, 'Saving Settings');
    //             });
    // }

    private handleAjaxError(error: any, errorText: string) {
        /**
         * Handle Ajax Errors
         * @param {any} error - HTTP Promise Reject error.
         */

        this.msgs = [];
        this.msgs.push({
            severity: 'error',
            summary: 'Failed',
            detail: errorText
        });
    }
}
