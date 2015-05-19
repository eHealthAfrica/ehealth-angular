'use strict';

angular.module('app', [])
  .controller('AppCtrl', function(github) {
    var self = this;

    function handleError(error) {
      self.error = error;
    }

    function pluckDetails(response) {
      if (!(response.data && response.data.items)) {
        return;
      }

      function pluck(item) {
        return {
          name: item.name,
          url: item.html_url,
          description: item.description
        };
      }

      return response.data.items.map(pluck);
    }

    function bind(repos) {
      self.repos = repos;
    }

    github.repos()
      .then(pluckDetails)
      .then(bind)
      .catch(handleError);
  })
  .service('github', function($http) {
    var url = 'https://api.github.com/search/repositories?q=angular-eha+user%3Aehealthafrica';
    this.repos = function() {
      return $http.get(url);
    };
  });
