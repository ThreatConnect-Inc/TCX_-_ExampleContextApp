/* Core */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/* Routing */
import { AppRoutingModule } from './app-routing.module';

/* Third-Party */
import {
    BowserModule,
    BowserService
} from 'ngx-bowser';
import {
    AccordionModule,
    ButtonModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    // MenuItem,
    // Message,
    PanelModule,
    SharedModule,
    StepsModule,
    TabViewModule
}
from 'primeng/primeng';

/* Components */
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { AssociationsComponent } from './components/associations/associations.component';
import { OwnersComponent } from './components/owners/owners.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { ResourceComponent } from './components/resource/resource.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

/* Services */
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesMessagesService,
    SpacesRequestService,
    SpacesStorageService,
    SpacesUtilityService
} from 'spaces-ng';

import {
    // Address,
    // EmailAddress,
    // Host,
    TcExchangeDbService,
    TcGroupService,
    TcIndicatorService,
    TcOwnerService
    // Url
} from 'threatconnect-ng';

import { SettingsService } from './services/settings.service';

@NgModule({
    imports: [
        /* Core */
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        /* Bowser */
        BowserModule,
        /* PrimeNG */
        AccordionModule,
        ButtonModule,
        DataTableModule,
        DialogModule,
        DropdownModule,
        GrowlModule,
        InputTextModule,
        PanelModule,
        SharedModule,
        StepsModule,
        TabViewModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        SidebarComponent,
        AssociationsComponent,
        OwnersComponent,
        ParametersComponent,
        ResourceComponent,
        SettingsComponent
    ],
    providers: [
        /* Bowser Service */
        BowserService,
        /* TC Service */
        SettingsService,
        SpacesBaseService,
        SpacesLoggingService,
        SpacesMessagesService,
        SpacesRequestService,
        SpacesStorageService,
        SpacesUtilityService,
        TcExchangeDbService,
        TcGroupService,
        TcIndicatorService,
        TcOwnerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
