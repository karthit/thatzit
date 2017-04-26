import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats, Messages } from '../lib/collections';

Meteor.methods({
  newMessage(message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(message, Match.OneOf(
      {
        text: String,
        type: String,
        chatId: String
      },
      {
        picture: String,
        type: String,
        chatId: String
      }
    ));

    message.timestamp = new Date();
    message.userId = this.userId;

    const messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }

    check(name, String);

    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user name');
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);

    if (!otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }

    const chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    const chatId = Chats.insert(chat);

    return chatId;
  },
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to remove a chat.');
    }

    check(chatId, String);

    const chat = Chats.findOne(chatId);

    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  },
  updatePicture(base64Image) {
    if (!this.userId) {this.imgcrop.showModal();
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }
    //check(data, String);
    return Meteor.users.update(this.userId, { $set: { 'profile.picture': base64Image } });
  },   
  acceptRequest(userId,fromId){
      if(!fromId){
          throw new  Meteor.Error('not-logged-in','Must be logged in to send Request.');
      }
      check(userId,String);
      check(userId,String);
      
      Meteor.users.update({ _id: fromId }, { $pull: {"profile.friendRequests": userId }});
      
      Meteor.users.update({_id:fromId}, { $push: { 'profile.contacts': userId } });
      
      return  Meteor.users.update({_id:userId}, { $push: { 'profile.contacts': fromId } });
  },
  updateFriendRequest(userId,fromId){
    if(!userId){
        throw new Meteor.Error('not-logged-in','Must be logged in to send Request.');
    }  
    check(userId,String);
    check(fromId,String);
    Meteor.users.update({_id:fromId}, { $push: { 'profile.sentRequests': userId } });
    return  Meteor.users.update({_id:userId}, { $push: { 'profile.friendRequests': fromId } });
  } 
});