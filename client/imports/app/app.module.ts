/**
 * Created by supeng on 2017/4/8.
 */
import { NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import{ AppComponent} from './app.component';
import { PARTIES_DECLARATIONS } from './parties';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        PARTIES_DECLARATIONS.PartiesFormComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}