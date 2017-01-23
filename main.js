(function() {
    'use strict';
    var app = angular.module('dndApp', ['ngRoute','ngMaterial'])

     app.config(function($routeProvider,$locationProvider,$httpProvider) {

            //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $locationProvider.html5Mode(true);

        $routeProvider        
        .when('/eldrathil-campaign',{
            templateUrl:'eldrathil-campaign/home.html',
            controller:'homeController'
        })

        .when('/eldrathil-campaign/characters',{
            templateUrl:'eldrathil-campaign/characters/characters.html',
            controller:'characterController'
        })

        .when('/eldrathil-campaign/world',{
            templateUrl:'eldrathil-campaign/content/world.html',
            controller:'worldController'
        }).otherwise({ redirectTo: '/eldrathil-campaign' });

    });

    app.controller('appCtrl' ,['$scope',
        function($scope){
            $scope.currentNavItem = '';
        }
    ]);
    
    app.controller('homeController', [
        function() {

        }
    ]);
    
    app.controller('characterController', ['$scope','$http',
        function($scope,$http) {
            $scope.characters = {};
            $http({
              method: 'GET',
              url: 'https://axhav.github.io/eldrathil-campaign/characters/testchar.json'
            }).then(function(httpresults)
            {
                var results = httpresults.data; 
                for(var player in results) 
                {
                    $scope.team1[results[player]['name']] = results[player]
                }
            },function(error){
                console.log(error)
            });

        }
    ]);
    
    app.controller('worldController', [
        function() {

        }
    ]);

}());