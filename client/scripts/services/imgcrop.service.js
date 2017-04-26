import { Service } from 'angular-ecmascript/module-helpers';

import imgcropTemplateUrl from '../../templates/imgcrop.html';

export default class imgcropService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = imgcropTemplateUrl;
  }

  showModal() {
    this.scope = this.$rootScope.$new();

    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: this.scope
    })
    .then((modal) => {
      this.modal = modal;
      this.modal.show();
    });
  }

  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }
}

imgcropService.$name = 'imgcrop';
imgcropService.$inject = ['$rootScope', '$ionicModal'];