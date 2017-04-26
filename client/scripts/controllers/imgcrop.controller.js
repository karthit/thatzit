import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import Cropper from 'cropperjs';

let cropper;
export default class imgcropCtrl extends Controller {
  constructor() {
    super(...arguments);     
    setTimeout(function() {
        document.getElementById("image").src = sessionStorage.getItem('imageData');
        var image = document.getElementById('image');
    
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            ready: function () {
              croppable = true;
            }
        });
    }, 1000);
      
  }
    
  cropIt(){
    var Image = cropper.getCroppedCanvas();
    var base64Image = this.getRoundedCanvas(Image);  
    this.callMethod('updatePicture', base64Image.toDataURL(), (err) => {
        this.handleError(err); 
    });
    this.imgcrop.hideModal();
  }
   
    
  getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
      context.strokeStyle = 'rgba(0,0,0,0)';
      context.stroke();
      context.clip();
      context.drawImage(sourceCanvas, 0, 0, width, height);

      return canvas;
    }
}

imgcropCtrl.$name = 'imgcropCtrl';
imgcropCtrl.$inject = ['$state', 'imgcrop', '$ionicPopup', '$log'];