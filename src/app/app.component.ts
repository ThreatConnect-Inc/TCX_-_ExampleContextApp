import {
    Component,
    OnInit
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesMessagesService,
    SpacesStorageService
}
from 'spaces-ng';

@Component({
    templateUrl: './app.component.html',
    selector: 'tc-spaces-app'
})
export class AppComponent implements OnInit {
    constructor(
        private logging: SpacesLoggingService,
        public  messages: SpacesMessagesService,
        private router: Router,
        private spacesBase: SpacesBaseService,
        private storage: SpacesStorageService
    ) {
        this.logging.logLevel = 'debug';  // set app default logging level
        this.logging.moduleColor('#633974', '#fff', 'AppComponent');  // set logging console colors
    }

    ngOnInit() {
        this.router
            .routerState
            .root
            .queryParams
            .subscribe(params => {
                /* initialize spaces module with params (only once) */
                this.spacesBase.init(params);

                this.spacesBase.initialized.then(() => {
                    /* store app parameters */
                    this.storage.create('tcSelectedItem', this.spacesBase.param('tcSelectedItem'));
                    this.storage.create('tcType', this.spacesBase.param('tcType'));

                    this.logging.logLevel = this.spacesBase.param('logging') || 'info';
                });
            });
    }

    /*
    The Router manages the observables it provides and localizes the subscriptions. The
    subscriptions are cleaned up when the component is destroyed, protecting against memory
    leaks, so we don't need to unsubscribe from the route params Observable.
    */
}
