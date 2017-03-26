import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class NewChatCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('users');

    this.helpers({
      users() {
        var selectedWaffers =  Meteor.users.find({_id: this.currentUserId}, { "profile.contacts": 1 , _id: 0 }).fetch();
        var selectedWaffers2 = Meteor.users.find({_id: this.currentUserId}, { "profile.sentRequests": 1, _id:0}).fetch();
        if(selectedWaffers.length > 0)
            return Meteor.users.find({
                $and:[ 
                    {_id: {$nin: selectedWaffers[0].profile.contacts }},
                    {_id: {$nin: selectedWaffers2[0].profile.sentRequests }},
                    {_id: {$ne:this.currentUserId}} 
                ]
            });
        else return;
      }
    });
  }

  newChat(userId) {
    let chat = Chats.findOne({ userIds: { $all: [this.currentUserId, userId] } });

    if (chat) {
      this.hideNewChatModal();
      return this.goToChat(chat._id);
    }

    this.callMethod('newChat', userId, (err, chatId) => {
      this.hideNewChatModal();
      if (err) return this.handleError(err);
      this.goToChat(chatId);
    });
  }

  hideNewChatModal() {
    this.NewChat.hideModal();
  }
    
  showSearch(userId) {
    let chat = Chats.findOne({ userIds: { $all: [this.currentUserId, userId] } });

    if (chat) {
      this.hideNewChatModal();
      return this.goToChat(chat._id);
    }
  }

 fireRequest(userId) {
      this.callMethod('updateFriendRequest', userId,this.currentUserId, (err) => {
        if(err) return this.handleError(err);
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

NewChatCtrl.$name = 'NewChatCtrl';
NewChatCtrl.$inject = ['$state', 'NewChat', '$ionicPopup', '$log'];