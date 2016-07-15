var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PhotoConstants = require('../constants/photoConstants');

var _currentUserPhotos = [];
var _otherUserPhotos = [];

var PhotoStore = new Store(AppDispatcher);

PhotoStore.returnCurrentUserPhotos = function () {
  return _currentUserPhotos;
};

PhotoStore.addPhotoToCurrentUserPhotos = function (image) {
  _currentUserPhotos.push(image);
};

PhotoStore.updateDescription = function (image) {
  _currentUserPhotos.forEach(function (photo, index) {
    if (photo.photo_id === image.photo.photo_id) {
      photo.description = image.photo.description;
    }
  });
};

PhotoStore.otherUserDefaultProfilePic = function () {
  var desiredPhoto = {};

  if (_otherUserPhotos.length === 1) {
    return _otherUserPhotos[0];
  }

  _otherUserPhotos.forEach(function (photo) {
    if (photo[is_default]) {
      desiredPhoto = photo;
    }
  });

  return desiredPhoto;
};

PhotoStore.otherUserAllPhotos = function () {
  return _otherUserPhotos;
};

PhotoStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PhotoConstants.NEW_PHOTO:
      this.addPhotoToCurrentUserPhotos(payload.image);
      this.__emitChange();
      break;
    case PhotoConstants.CURRENT_USER_PHOTOS:
      _currentUserPhotos = payload.images;
      this.__emitChange();
      break;
    case PhotoConstants.OTHER_USER_PHOTOS:
      _otherUserPhotos = payload.images;
      this.__emitChange();
      break;
    case PhotoConstants.UPDATE_DESCRIPTION:
      this.updateDescription(payload.image);
      this.__emitChange();
      break;
    }
};

module.exports = PhotoStore;
