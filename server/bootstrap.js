import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(function() {
  if (Meteor.users.find().count() != 0) return;

  Accounts.createUserWithPhone({
    phone: '+972501234567',
    profile: {
      name: 'Vicky'
    }
  });

  Accounts.createUserWithPhone({
    phone: '+972501234568',
    profile: {
      name: 'Daisy'
    }
  });

  Accounts.createUserWithPhone({
    phone: '+972501234569',
    profile: {
      name: 'Ajay'
    }
  });
});