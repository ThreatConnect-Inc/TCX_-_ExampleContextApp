import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
}
from '@angular/router';
import { MainComponent } from './main.component';
import { AssociationsComponent } from './components/associations.component';

const routes: Routes = [{
        path: '',
        component: MainComponent
    }, {
        path: 'index.html',
        component: MainComponent
    }, {
        path: 'main',
        component: MainComponent
    }, {
        path: 'associations',
        component: AssociationsComponent
    }];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}