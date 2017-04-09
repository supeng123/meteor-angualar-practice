/**
 * Created by supeng on 2017/4/8.
 */
import { Meteor} from 'meteor/meteor';
import {loadParties} from './imports/fixtures/parties'

Meteor.startup( () => {
    loadParties();
});