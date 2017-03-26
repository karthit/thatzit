import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class RegisterCtrl extends Controller {
      
  register() {
    if (_.isEmpty(this.firstname) && _.isEmpty(this.lastname) && _.isEmpty(this.mobile) && _.isEmpty(this.email) && _.isEmpty(this.password)){
      return;  
    } 

    const confirmPopup = this.$ionicPopup.confirm({
      title: 'Email confirmation',
      template: '<div>' + this.email + '</div><div>Is your email above correct?</div>',
      cssClass: 'text-center',
      okText: 'Yes',
      okType: 'button-positive button-clear',
      cancelText: 'edit',
      cancelType: 'button-dark button-clear'
    });

    confirmPopup.then((res) => {
      if (!res) return;

      this.$ionicLoading.show({
        template: 'Creating User...'
      });
      
        
      var user = {'email':this.email,password:this.password,profile:{firstname:this.firstname,lastname:this.lastname,mobile:this.mobile,name:"",sentRequests:[],friendRequests:[],contacts:[]}};

        
      Accounts.createUser(user, (err) => {
        this.$ionicLoading.hide();
        if (err) return this.handleError(err);        
        this.$state.go('login', { });
      });
    });
  }
                      
  handleError(err) {
    this.$log.error('Register error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Registration  failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

RegisterCtrl.$name = 'RegisterCtrl';
RegisterCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];