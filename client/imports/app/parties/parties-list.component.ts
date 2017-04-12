/**
 * Created by supeng on 2017/4/9.
 */
import { Component ,OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Meteor } from 'meteor/meteor';
import {Subscription} from 'rxjs/Subscription';
import {MeteorObservable} from 'meteor-rxjs';


import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import template from './parties-list.component.html';

@Component({
    selector: 'parties-list',
    template
})

export class PartiesListComponent implements OnInit, OnDestroy{
    parties: Observable<Party[]>;
    partiesSub: Subscription;

    constructor(){
        // this.parties = Parties.find({}).zone()
    }

    search(value: string): void {
        this.parties = Parties.find(value ? { location: value } : {}).zone();
    }

    ngOnInit() {
        this.parties = Parties.find({}).zone();
        this.partiesSub = MeteorObservable.subscribe('parties').subscribe();
    }

    ngOnDestroy() {
        this.partiesSub.unsubscribe();
    }

    removeParty(party: Party): void {
        if (!Meteor.userId()) {
            alert('Please log in to add a party');
            return;
        }
        Parties.remove(party._id);
    }
}