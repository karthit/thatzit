import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class newChatPicture extends Filter {
  filter(user) {
    if (!user) return;
      
    let otherUser = Meteor.users.findOne(user._id);
    let hasPicture = otherUser && otherUser.profile && otherUser.profile.picture;

    return hasPicture ? otherUser.profile.picture : '/user-default.svg';
  };
}

newChatPicture.$name = 'newChatPicture';