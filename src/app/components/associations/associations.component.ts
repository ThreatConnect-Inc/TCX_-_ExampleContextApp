import {
  Component,
} from '@angular/core';

import {
  Router
} from '@angular/router';


import {
  SpacesBaseService,
  SpacesLoggingService
} from 'spaces-ng/';

@Component({
  templateUrl: './associations.component.html',
  selector: 'tc-context-associations'
})
export class AssociationsComponent {
  /*
  @Input()
  firstRun = true;
  */

  contextData: string;
  params: any;

  constructor(
    private logging: SpacesLoggingService,
    private router: Router,
    private spaces: SpacesBaseService
    // private tcGroup: TcGroupService,
    // private tcIndicator: TcIndicatorService
  ) {
    this.logging.debug('this.spaces.params', this.spaces.params);
  }

  /*
  public loadIndicator(id: string, type: string, owner: string): void {
      console.log('resource.component:loadIndicator');
      if (this.firstRun) {
          this.firstRun = false;
          this.tcIndicator.getById(id, type, owner)
              .then(res => {
                  this.contextData = JSON.stringify(res, null, 4);
              });
      }
  }

  public loadGroup(id: string, type: string, owner: string) {
      console.log('resource.component:loadGroup');
      if (this.firstRun) {
          this.firstRun = false;
          this.tcGroup.getById(id, type, owner)
              .then(res => {
                  this.contextData = JSON.stringify(res, null, 4);
              });
      }
  }
  */

  get spacesElementId(): string {
    return this.spaces.tcSpaceElementId;
  }

  goTo(route) {
    this.logging.methodColor('#1abc9c', '#fff');
    this.logging.debug('route', route);
    this.router.navigate([route], {queryParams: this.params});
  }
}
