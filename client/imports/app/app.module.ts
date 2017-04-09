/**
 * Created by supeng on 2017/4/8.
 */
import { NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {RouterModule} from '@angular/router';

import{ AppComponent} from './app.component';
import { routes } from './app.routes';
import { PARTIES_DECLARATIONS } from './parties';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
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