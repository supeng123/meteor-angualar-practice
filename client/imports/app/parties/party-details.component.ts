/**
 * Created by supeng on 2017/4/9.
 */

import { Component ,OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { CanActivate } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Parties} from '../../../../both/collections/parties.collection';
import { Party} from '../../../../both/models/party.model';

import template from './party-details.component.html';

@Component({
    selector: 'party-details',
    template
})

export class PartyDetailsComponent implements OnInit, OnDestroy, CanActivate {
    partyId: string;
    paramsSub: Subscription;
    party: Party;
    partySub: Subscription;

    constructor(
      private route: ActivatedRoute
    ) {}

    canActivate() {
        const party = Parties.findOne(this.partyId);
        return (party && party.owner == Meteor.userId());
    }

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['partyId'])
            .subscribe(partyId => {
                this.partyId = partyId;
                // this.party = Parties.findOne(this.partyId);

                if (this.partySub) {
                    this.partySub.unsubscribe();
                }

                this.partySub = MeteorObservable.subscribe('party', this.partyId).subscribe(() => {
                    this.party = Parties.findOne(this.partyId);
                });
            });
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.partySub.unsubscribe();
    }

    saveParty() {
        if (!Meteor.userId()) {
            alert('Please log in to change this party');
            return;
        }
        Parties.update(this.party._id, {
            $set: {
                name: this.party.name,
                description: this.party.description,
                location: this.party.location
            }
        });
    }
}