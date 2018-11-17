'use strict';

var C = angular.module('ConstantsMod', []);

C.constant('API', {
  SEARCH_USERS: 'https://api.github.com/search/users',
  CREATE_GIST: 'https://api.github.com/gists',
  GET_GISTS: 'https://api.github.com/users/:username/gists'
});
