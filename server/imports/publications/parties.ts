/**
 * Created by supeng on 2017/4/12.
 */
import {Meteor} from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import {Parties} from '../../../both/collections/parties.collection';

interface Options {
    [key: string]: any;
}

Meteor.publish('parties', function(options: Options, location?: string) {
    const selector = buildQuery.call(this, null, location);
    Counts.publish(this, 'numberOfParties', Parties.collection.find(buildQuery.call(this)), {noReady: true});

    return Parties.find(selector, options);
});

Meteor.publish('party', function(partyId: string) {
    return Parties.find(buildQuery.call(this, partyId));
});

function buildQuery(partyId?: string, location?: string): Object {
    const isAvailable = {
        $or: [{
            // party is public
            public: true
        },
            // or
            {
                // current user is the owner
                $and: [{
                    owner: this.userId
                }, {
                    owner: {
                        $exists: true
                    }
                }]
            }]
    };

    const searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };

    if (partyId) {
        return {
            // only single party
            $and: [{
                location: searchRegEx
            },
                isAvailable
            ]
        };
    }
    return isAvailable;
}
