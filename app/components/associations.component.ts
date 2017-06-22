import {
    Component,
    Input,
    OnInit
}
from '@angular/core';

import {
    Router
} from '@angular/router';

import {
    Button,
    Column,
    DataTable
}
from 'primeng/primeng';

import {
    SpacesBaseService,
    SpacesLoggingService
}
from 'spaces-ng/dist/main';

// import {
//     TcGroupService,
//     TcIndicatorService,
// }
// from 'threatconnect-ng/dist/main';

@Component({
    templateUrl: './app/components/associations.component.html',
    selector: 'associations-component'
})
export class AssociationsComponent implements OnInit {
    // @Input(firstRun): boolean;
    contextData: string;
    firstRun: boolean = true;
    params: any;

    constructor(
        private logging: SpacesLoggingService,
        private router: Router,
        private spaces: SpacesBaseService
        // private tcGroup: TcGroupService,
        // private tcIndicator: TcIndicatorService
    ) { /* empty block */ }
    ngOnInit() {
        this.logging.debug('this.spaces.params', this.spaces.params);

        // this.router
        //     .routerState
        //     .queryParams
        //     .subscribe(params => {
        //         console.log('params', params);
        //         this.params = params;
        //     });
    }

    // public loadIndicator(id: string, type: string, owner: string): void {
    //     console.log('resource.component:loadIndicator');
    //     if (this.firstRun) {
    //         this.firstRun = false;
    //         this.tcIndicator.getById(id, type, owner)
    //             .then(res => {
    //                 this.contextData = JSON.stringify(res, null, 4);
    //             });
    //     }
    // }

    // public loadGroup(id: string, type: string, owner: string) {
    //     console.log('resource.component:loadGroup');
    //     if (this.firstRun) {
    //         this.firstRun = false;
    //         this.tcGroup.getById(id, type, owner)
    //             .then(res => {
    //                 this.contextData = JSON.stringify(res, null, 4);
    //             });
    //     }
    // }

    goTo(route) {
        this.logging.methodColor('#1abc9c', '#fff');
        this.logging.debug('route', route);
        this.router.navigate([route], {queryParams: this.params});
    }
}
