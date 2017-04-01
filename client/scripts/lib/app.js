// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';

// Modules
import ChatsCtrl from '../controllers/chats.controller';
import ChatCtrl from '../controllers/chat.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import LoginCtrl from '../controllers/login.controller';
import RegisterCtrl from '../controllers/register.controller';
import NewChatCtrl from '../controllers/new-chat.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingCtrl from '../controllers/setting.controller';
import ContactsCtrl from '../controllers/contacts.controller'
import RequestedCtrl from '../controllers/requested.controller';
import RequestsCtrl from '../controllers/requests.controller';
import InputDirective from '../directives/input.directive';
import CalendarFilter from '../filters/calendar.filter';
import ChatNameFilter from '../filters/chat-name.filter';
import ChatPictureFilter from '../filters/chat-picture.filter';
import NewChatPictureFilter from '../filters/new-chat.filter';
import NewChatService from '../services/new-chat.service';
import Routes from '../routes';

const App = 'ThatzIt';

// App
Angular.module(App, [
  'angular-meteor',
  'angular-meteor.auth',
  'angularMoment',
  'ionic'
]);

new Loader(App)
  .load(ChatsCtrl)
  .load(ChatCtrl)
  .load(ConfirmationCtrl)
  .load(LoginCtrl)
  .load(RegisterCtrl)
  .load(NewChatCtrl)
  .load(ProfileCtrl)
  .load(SettingCtrl)
  .load(ContactsCtrl)
  .load(RequestedCtrl)
  .load(RequestsCtrl)
  .load(InputDirective)
  .load(CalendarFilter)
  .load(ChatNameFilter)
  .load(ChatPictureFilter)
  .load(NewChatPictureFilter)
  .load(NewChatService)  
  .load(Routes);

// Startup
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}

function onReady() {
  Angular.bootstrap(document, [App]);
}