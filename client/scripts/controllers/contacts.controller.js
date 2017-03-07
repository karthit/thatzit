import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class ContactsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('users');

    this.helpers({ 
      contactUsers(){
        var selectedWaffers =  Meteor.users.find({_id: this.currentUserId}, { "profile.contacts": 1 ,  _id: 0 }).fetch();
        if(selectedWaffers.length > 0)
            return Meteor.users.find({ _id: { $in: selectedWaffers[0].profile.contacts } });
        else return;
      }
    });
  }

  newChat(userId) {
    let chat = Chats.findOne({ userIds: { $all: [this.currentUserId, userId] } });

    if (chat) {
      return this.goToChat(chat._id);
    }

    this.callMethod('newChat', userId, (err, chatId) => {
      if (err) return this.handleError(err);
      this.goToChat(chatId);
    });
  }

  goToChat(chatId) {
    this.$state.go('tab.chat', { chatId });
  }

  handleError(err) {
    this.$log.error('New chat creation error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'New chat creation failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

ContactsCtrl.$inject = ['$state', 'NewChat','$ionicPopup', '$log'];