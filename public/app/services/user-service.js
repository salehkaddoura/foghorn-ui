'use strict';

angular.module('UserServiceMod', ['ConstantsMod'])
  .service('UserService', UserServiceFn);

function UserServiceFn($http, API) {
  return {
    getUsers: getUsers,
    createGist: createGist,
    getGists: getGists,
  };

  function getUsers(params) {
    return $http({
      method: 'GET',
      params: params,
      url: API.SEARCH_USERS,
    }).then(function getUsersAjax(res) {
      return res.data || [];
    });
  }

  function createGist(body) {
    return $http({
      method: 'POST',
      data: body,
      url: API.CREATE_GIST,
    }).then(function createGistAjax(res) {
      return res.data || [];
    });
  }

  function getGists(username) {
    var urlRegex = /:username/gi;
    var url = API.GET_GISTS.replace(urlRegex, username);

    return $http({
      method: 'GET',
      url: url,
    }).then(function getGistsAjax(res) {
      return res.data || [];
    });
  }
}
