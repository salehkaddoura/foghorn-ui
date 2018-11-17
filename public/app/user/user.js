'use strict';

angular
  .module('UserMod', ['ui.router', 'UserServiceMod'])
  .config(UserConfigFn)
  .controller('UserController', UserControllerFn);

function UserConfigFn($stateProvider) {
  $stateProvider.state('user', {
    url: '/user?username',
    title: 'User',
    controller: 'UserController as userCtrl',
    templateUrl: '/app/user/user.tpl.html',
  });
}

function UserControllerFn($stateParams, UserService) {
  var userCtrl = this;

  userCtrl.$onInit = onInit;
  userCtrl.createGist = createGist;

  userCtrl.user = {};
  userCtrl.gist = {};

  function onInit() {
    if ($stateParams.username) {
      getUser($stateParams.username);
      getGists($stateParams.username);
    }
  }

  function getUser(username) {
    UserService.getUsers({ q: username }).then(function getUserSuccess(data) {
      userCtrl.user = data.items[0];
    }, function getUserErr(err) {
      // err handling
    });
  }

  function getGists(username) {
    UserService.getGists(username).then(function getGistsSuccess(data) {
      userCtrl.gists = data;
    }, function getGistsErr(err) {
      // handle err
    })
  }

  function createGist(gist) {
    var gistBody = {
      description: userCtrl.gist.description,
      public: true,
      files: {},
    };

    gistBody.files[userCtrl.gist.filename] = {
      content: userCtrl.gist.content,
    };

    UserService.createGist(gistBody).then(function createGistSuccess(data) {
      // handle success
    }, function createGistErr(err) {
      // handle err
    });
  }
}