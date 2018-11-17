'use strict';

angular
  .module('home', ['ui.router', 'UserServiceMod', 'UserMod'])
  .config(ConfigFn)
  .controller('CoreController', coreControllerFn);

  function ConfigFn($stateProvider, $locationProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: '/app/home.tpl.html',
      controller: 'CoreController as coreCtrl',
    });

    $locationProvider.html5Mode(true);
  }

  function coreControllerFn($state, UserService) {
    var coreCtrl = this;

    coreCtrl.getUsers = getUsers;
    coreCtrl.users = [];

    function getUsers(username) {
      coreCtrl.users.length = 0;

      if (username) {
        var params = { q: username };
      
        UserService.getUsers(params).then(function getUsers(data) {
          coreCtrl.users = data.items;
        });  
      }
      
    }
  }