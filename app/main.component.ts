import {
    Component,
    OnInit,
    ViewChild
}
from '@angular/core';
import { Router } from '@angular/router';

/*
import {
    AutoComplete,
    Button,
    Column,
    DataTable,
    Dialog,
    Draggable,
    Dropdown,
    Droppable,
    Footer,
    Growl,
    Header,
    InputSwitch,
    InputText,
    Message,
    Panel,
    TabView,
    TabPanel
}
from 'primeng/primeng';
*/

import { SettingsService } from './services/settings.service';

import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesMessagesService,
    SpacesStorageService
}
from 'spaces-ng/';

/*
import {
    TcExchangeDbService,
    TcGroupService,
    TcIndicatorService,
    TcOwnerService
}
from 'threatconnect-ng/';
*/

import { OwnersComponent } from './components/owners.component';
import { ParametersComponent } from './components/parameters.component';
import { ResourceComponent } from './components/resource.component';
import { SettingsComponent } from './components/settings.component';


@Component({
    templateUrl: 'app/main.component.html',
    selector: 'main',
})
export class MainComponent implements OnInit {
    @ViewChild(OwnersComponent) oc: OwnersComponent;
    @ViewChild(ParametersComponent) pc: ParametersComponent;
    @ViewChild(ResourceComponent) rc: ResourceComponent;
    @ViewChild(SettingsComponent) sc: SettingsComponent;
    // msgs: Message[] = [];

    // ownerData: string = 'Not Applicable';
    // params: any;  // passed in parameters
    paramsData: any[] = [];

    resourceType: string;  // indicator or group

    /* tab configuration */
    showTab: any;
    tabIndex: any[];

    /* spaces parameters */
    tcSelectedItem: string;
    tcSelectedItemOwner: string;
    tcSpaceElementId: string;
    tcType: string;

    constructor(
        private logging: SpacesLoggingService,
        private messages: SpacesMessagesService,
        private router: Router,
        private settings: SettingsService,
        private spacesBase: SpacesBaseService,
        private storage: SpacesStorageService
        // private tcGroup: TcGroupService,
        // private tcIndicator: TcIndicatorService,
        // private tcOwner: TcOwnerService
    ) {
        this.logging.moduleColor('#FFFF00', '#000', 'MainComponent');  // set logging console colors
    }

    ngOnInit() {
        this.logging.critical('this.logging.logLevel', this.logging.logLevel);

        // default tab visibility
        this.showTab = {
            'settings': true,
            'resource': false,
            'owners': false
        };
        // tab config
        this.tabIndex = [{
            name: 'parameters',
            visible: false
        }];

        // spacesBase promise (indicates query parameters have been stored)
        this.spacesBase.initialized.then(() => {
            this.logging.info('this.spacesBase.params', this.spacesBase.params);

            this.tcSelectedItem = this.storage.read('tcSelectedItem');
            this.tcType = this.storage.read('tcType');

            this.logging.debug('this.tcSelectedItem', this.tcSelectedItem);
            this.logging.debug('this.tcType', this.tcType);

            /* build param data */
            for (let name in this.spacesBase.params) {
                if (this.spacesBase.params.hasOwnProperty(name)) {
                    this.paramsData.push({
                        'name': name,
                        'value': this.spacesBase.params[name]
                    });
                }
            }

            /* load settings */
            this.settings.load();  // load setting from TC DataStore

            /* load data for "Resource Data" tab */
            this.loadContextData();
        });
    }

    /* TODO - this needs updating */
    loadContextData() {
        switch (this.tcType) {
            case 'Address':
            case 'EmailAddress':
            case 'File':
            case 'Host':
            case 'Url':
                this.resourceType = 'indicator';
                this.enableTab('settings');
                this.enableTab('resource');
                this.enableTab('owners');
                break;
            case 'Adversary':
            case 'Document':
            case 'Email':
            case 'Incident':
            case 'Signature':
            case 'Threat':
                this.resourceType = 'group';
                this.enableTab('settings');
                this.enableTab('resource');
                break;
            case 'Tag':
                this.logging.info('Tag', '');
                break;
            case 'Victim':
                this.logging.info('Victim', '');
                break;
            default:
                this.logging.warn('Type is not supported', this.tcType);
        }
    }

    /* on tab change load data */
    public tabChange(event) {
        this.logging.debug('event.index', event.index);
        this.logging.debug('this.tabIndex[event.index]', this.tabIndex[event.index]);

        switch (this.tabIndex[event.index].name) {
            case 'settings':
                break;
            case 'resource':
                if (this.resourceType === 'indicator') {
                    this.rc.loadIndicator(this.tcSelectedItem, this.tcType, this.tcSelectedItemOwner);
                } else if (this.resourceType === 'group') {
                    this.rc.loadGroup(this.tcSelectedItem, this.tcType, this.tcSelectedItemOwner);
                }
                break;
            case 'owners':
                this.oc.loadOwners(this.tcSelectedItem, this.tcType);
                break;
            default:
                this.logging.warn('Unknown Tab', '');
        }
    }

    /* enable a previously disabled tab */
    private enableTab(indexName) {
        this.tabIndex.push({
            'name': indexName,
            'visible': true
        });
        this.showTab[indexName] = true;
    }

    /* example of ng2-spaces message feature */
    public errorMessage(msg) {
        this.logging.debug('msg', msg);
        this.messages.showError('Error Message', msg);
    }

    /* example of changing route */
    public goTo(route) {
        this.logging.debug('route', route);
        this.router.navigate([route], {queryParams: {'blah': 'one'}});
    }

    /* example of ng2-spaces message feature */
    public successMessage(msg) {
        this.logging.debug('msg', msg);
        this.messages.showSuccess('Success Message', msg);
    }
}
