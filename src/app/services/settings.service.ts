import { Injectable } from '@angular/core';
import {
    SpacesLoggingService,
    SpacesMessagesService
} from 'spaces-ng';
import { TcExchangeDbService } from 'threatconnect-ng';


@Injectable()
export class SettingsService {
    public domain: string = 'local';  // system, organization, local
    private searchCommand: string = '1';
    private typeName: string = 'sampleApp-settings';
    public savedSettings: string;

    constructor(
        private exchangeDB: TcExchangeDbService,
        private logging: SpacesLoggingService,
        private messages: SpacesMessagesService
    ) { /* empty block */ }

    public load(
        domain: string = this.domain,
        typeName: string = this.typeName,
        searchCommand: string = this.searchCommand) {
        /*
         * Load settings from Data Store
         */
        this.logging.debug('load', '');

        this.exchangeDB.read(domain, typeName, searchCommand)
            .subscribe(
                response => {
                    let savedSettings = response._source || {};
                    this.savedSettings = JSON.stringify(savedSettings, null, 4);

                    this.messages.showSuccess('Success', 'Loading Settings');
                    if (Object.getOwnPropertyNames(this.savedSettings).length === 0) {
                        this.init();
                    }
                    this.logging.debug('savedSettings',
                        JSON.stringify(this.savedSettings, null, 4));
                },
                err => {
                    this.logging.error('Error', err);
                    this.messages.showError('Failed', 'Loading Settings');
                }
            );
    }

    private init() {
        /*
         * Create base config if no previous config exists
         */
        this.logging.debug('init', '');

        /* Elastic Search Mapping Example
        this.savedSettings['mappings'] = {
            '_default_': {
                '_all': {
                    'enabled': false
                }
            },
            'dynamic_templates': [{
                'long': {
                    'match_mapping_type': 'long',
                    'mapping': {
                        'type': 'string'
                    }
                }
            }],
            'properties': {
                'name': 'string',
                'value': 'string'
            }
        };
        */
        this.savedSettings = '';
        this.exchangeDB.create(this.domain, this.typeName, this.searchCommand, this.savedSettings);
    }

    public save(
        domain: string = this.domain,
        typeName: string = this.typeName,
        searchCommand: string = this.searchCommand) {
        /*
         * Save configuration
         */
        this.logging.debug('save', '');

        this.exchangeDB.update(domain, typeName, searchCommand,
            this.savedSettings)
                .subscribe(
                    response => {
                        this.messages.showSuccess('Success', 'Saving Settings');
                    },
                    err => {
                        this.logging.error('Error', err);
                        this.messages.showError('Failed', 'Saving Settings');
                    }
                );
    }
}
