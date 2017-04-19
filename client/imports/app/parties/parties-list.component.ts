/**
 * Created by supeng on 2017/4/9.
 */
import { Component ,OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Meteor } from 'meteor/meteor';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/combineLatest';
import {Subscription} from 'rxjs/Subscription';
import {MeteorObservable} from 'meteor-rxjs';
import {PaginationService} from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';


import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import template from './parties-list.component.html';



interface Pagination {
    limit: number;
    skip: number;
}

interface Options extends Pagination {
    [key: string]: any
}

@Component({
    selector: 'parties-list',
    template
})

export class PartiesListComponent implements OnInit, OnDestroy{
    parties: Observable<Party[]>;
    partiesSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    nameOrder: Subject<number> = new Subject<number>();
    optionsSub: Subscription;
    partiesSize: number = 0;
    autorunSub: Subscription;
    location: Subject<string> = new Subject<string>();

    constructor(private paginationService: PaginationService){
        // this.parties = Parties.find({}).zone()
    }

    search(value: string): void {
        this.curPage.next(1);
        this.location.next(value);
    }

    ngOnInit() {
        // const options: Options ={
        //     limit: this.pageSize,
        //     skip: (this.curPage - 1) * this.pageSize,
        //     sort: {name: this.nameOrder}
        // };

        this.optionsSub = Observable.combineLatest(this.pageSize, this.curPage, this.nameOrder, this.location)
            .subscribe(([pageSize, curPage, nameOrder, location]) => {
                const options: Options ={
                    limit: pageSize as number,
                    skip: ((curPage as number) -1) * (pageSize as number),
                    sort: {name: nameOrder as number}
                };

            if (this.partiesSub) {
                this.partiesSub.unsubscribe();
            }

            this.paginationService.setCurrentPage(this.paginationService.defaultId(), curPage as number);

            this.partiesSub = MeteorObservable.subscribe('parties', options, location).subscribe(() => {
                this.parties = Parties.find({}, {
                    sort: {
                        name: this.nameOrder
                    }
                }).zone();
            });

            this.paginationService.register({
                id: this.paginationService.defaultId(),
                itemsPerPage: 10,
                currentPage: 1,
                totalItems: this.partiesSize
            });

            this.pageSize.next(10);
            this.curPage.next(1);
            this.nameOrder.next(1);
                this.location.next('');

            this.autorunSub = MeteorObservable.autorun().subscribe(() => {
               this.partiesSize = Counts.get('numberOfParties');
               this.paginationService.setTotalItems(this.paginationService.defaultId(), this.partiesSize);
            });

        });

    }

    onPageChanged(page: number): void {
        this.curPage.next(page);
    }

    ngOnDestroy() {
        this.partiesSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autorunSub.unsubscribe();
    }

    removeParty(party: Party): void {
        if (!Meteor.userId()) {
            alert('Please log in to add a party');
            return;
        }
        Parties.remove(party._id);
    }
}