import { Store } from "flux/utils";

import AppDispatcher from "../dispatcher/dispatcher";

var PhotoConstants = require("../constants/photoConstants");

var _currentUserPhotos = [];
var _otherUserPhotos = [];

var PhotoStore = new Store(AppDispatcher);

PhotoStore.returnCurrentUserPhotos = function () {
  return _currentUserPhotos;
};

PhotoStore.addPhotoToCurrentUserPhotos = function (image) {
  _currentUserPhotos.push(image);
};

PhotoStore.returnDefaultProfilePic = function () {
  var result = {};

  _currentUserPhotos.forEach(function (photo, index) {
    if (photo.is_default) {
      result = photo;
    }
  });

  return result;
};

PhotoStore.updateDescription = function (image) {
  _currentUserPhotos.forEach(function (photo, index) {
    if (photo.photo_id === image.photo_id) {
      photo.description = image.description;
    }
  });
};

PhotoStore.removePhoto = function (image) {
  _currentUserPhotos.forEach(function (photo, index) {
    if (photo.photo_id === image.photo_id) {
      _currentUserPhotos.splice(index, 1);
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

PhotoStore.setNewDefault = function (photoId) {
  _currentUserPhotos.forEach(function (photo, index) {
    if (photo.photo_id === photoId) {
      photo.is_default = true;
    } else {
      photo.is_default = false;
    }
  });
};

PhotoStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
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
    case PhotoConstants.REMOVE_PHOTO:
      this.removePhoto(payload.image);
      this.__emitChange();
      break;
    case PhotoConstants.SET_NEW_DEFAULT:
      this.setNewDefault(payload.photoId);
      this.__emitChange();
      break;
  }
};

export default PhotoStore;
