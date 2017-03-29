import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class RequestsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('users');

    this.helpers({
      users() {
        var selectedWafers = Meteor.users.find({_id: this.currentUserId },{ fields:{ 'profile.friendRequests' : 1 } } ).fetch();
        if(selectedWafers.length > 0)
            return Meteor.users.find({ _id : { $in: selectedWafers[0].profile.friendRequests }});
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

  acceptFriendRequest(userId){
      this.callMethod('acceptRequest', userId,this.currentUserId, (err, chatId) => {
      if (err) return this.handleError(err);      
    });
  }
    
  goToChat(chatId) {
    this.$state.go('tab.chat', { chatId });
  }

  handleError(err) {
    this.$log.error('New chat creation error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Requested list retrival failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

RequestsCtrl.$name = 'RequestsCtrl';
RequestsCtrl.$inject = ['$state', 'NewChat','$ionicPopup', '$log'];