import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { SpacesBaseService } from 'spaces-ng';

@Injectable()
export class SpacesBaseResolver implements Resolve<any> {
  constructor(
    private spacesBaseService: SpacesBaseService
  ) {}

  resolve(route: ActivatedRouteSnapshot): any {
    this.spacesBaseService.init(route.queryParams);
    return true;
  }
}
