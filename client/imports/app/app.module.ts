/**
 * Created by supeng on 2017/4/8.
 */
import { NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {RouterModule} from '@angular/router';
import {AccountsModule} from 'angular2-meteor-accounts-ui';
import {Ng2PaginationModule} from 'ng2-pagination';

import{ AppComponent} from './app.component';
import { routes, ROUTES_PROVIDERS} from './app.routes';
import { PARTIES_DECLARATIONS } from './parties';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        AccountsModule,
        Ng2PaginationModule
    ],
    providers: [
        ...ROUTES_PROVIDERS
    ],
    declarations: [
        AppComponent,
        PARTIES_DECLARATIONS.PartiesFormComponent,
        PARTIES_DECLARATIONS.PartiesListComponent,
        PARTIES_DECLARATIONS.PartyDetailsComponent
        // ...PARTIES_DECLARATIONS
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}