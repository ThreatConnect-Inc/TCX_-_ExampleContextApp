import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
}
from '@angular/router';
import { MainComponent } from './main.component';
import { AssociationsComponent } from './components/associations.component';
import {SpacesBaseResolver} from "./services/SpacesBaseResolver";

const routes: Routes = [{
        path: '',
        component: MainComponent,
        resolve: {
          ready: SpacesBaseResolver
        }
    }, {
        path: 'index.html',
        component: MainComponent,
        resolve: {
          ready: SpacesBaseResolver
        }
    }, {
        path: 'main',
        component: MainComponent,
        resolve: {
          ready: SpacesBaseResolver
        }
    }, {
        path: 'associations',
        component: AssociationsComponent,
        resolve: {
          ready: SpacesBaseResolver
        }
    }];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
