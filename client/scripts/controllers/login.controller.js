import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';

export default class LoginCtrl extends Controller {
  login() {
    if (_.isEmpty(this.email) && _.isEmpty(this.password)) return;
      
    const confirmPopup = this.$ionicPopup.confirm({
      title: 'Email confirmation',
      template: '<div>' + this.email + '</div><div>Is your Email above correct?</div>',
      cssClass: 'text-center',
      okText: 'Yes',
      okType: 'button-positive button-clear',
      cancelText: 'cancel',
      cancelType: 'button-dark button-clear'
    });	 
	 
    confirmPopup.then((res) => {
      if (!res) return;

      this.$ionicLoading.show({
        template: 'Preparing your chats...'
      });
      
      Meteor.loginWithPassword(this.email,this.password,(err) =>{
        this.$ionicLoading.hide();
        if (err) return this.handleError(err);        
        this.$state.go('profile');    
      });
       
      /*    
      Accounts.callLoginMethod({
          methodArguments: [ {clientemail: this.email, clientPassword: this.password} ],
          userCallback:() => {
             this.$ionicLoading.hide();
             this.$state.go('confirmation', {});  
          }
      });
     */    

        
    });
  }

  register(){
    this.$state.go('register',{});  
  }
    
  handleError(err) {
    this.$log.error('Login error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];