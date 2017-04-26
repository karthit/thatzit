import { _ } from 'meteor/underscore';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import { Controller } from 'angular-ecmascript/module-helpers';
import  Cropper from 'cropperjs';

export default class ProfileCtrl extends Controller {
  constructor() {
    super(...arguments);

    const profile = this.currentUser && this.currentUser.profile;
    this.name = profile ? profile.name : '';
      
  }
    
  updatePicture () {
    MeteorCameraUI.getPicture({quality:100 }, (err, data) => {
      if (err) return this.handleError(err);

      this.$ionicLoading.show({
        template: 'Updating picture...'
      });

      sessionStorage.setItem('imageData',data);
      this.$ionicLoading.hide();
      this.imgcrop.showModal();   
    });
  }
    
  updateName() {
    if (_.isEmpty(this.name)) return;

      this.$state.go('tab.chats');
     
      this.callMethod('updateName', this.name, (err) => {
        if (err) return this.handleError(err);
        this.$state.go('tab.chats');
      });
  }

  handleError(err) {
    if (err.error == 'cancel') return;
    this.$log.error('Profile save error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

ProfileCtrl.$name = 'ProfileCtrl';
ProfileCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log','imgcrop'];
