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

        .when('/eldrathil-campaign/chars',{
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
    
    app.controller('homeController', ['$scope',
        function($scope) {
            
        }
    ]);
    
    app.controller('characterController', ['$scope','$http',
        function($scope,$http) {
            $scope.selectedCharacter = {};

            $scope.setSelected = function setSelected(sp) {
                console.log("test "+ sp)
                $scope.selectedCharacter = sp;
            }

            $scope.characters = {};
            
            
            $http({
              method: 'GET',
              url: 'https://axhav.github.io/eldrathil-campaign/characters/testchar.json'
            }).then(function(httpresults)
            {
                var results = httpresults.data; 
                for(var player in results) 
                {
                    $scope.characters[results[player]['name']] = results[player]
                }
            },function(error){
                console.log(error)
            });

        }
    ]);
    
    app.controller('worldController', ['$scope','$sce','$http',
        function($scope,$sce,$http) {
            $scope.worldcontent = {}

            $scope.setSelected = function setSelected(sp) {
                if(sp === "backstory")
                {
                    $scope.worldcontent.iframe = true; 
                    $scope.worldcontent.content = $sce.trustAsResourceUrl('https://docs.google.com/document/d/1uo1q6K0MExP3H33rZKqL2amRbZdVyeaTJsA9sXaFzI8/pub?embedded=true');
                }
                else if (sp === "faq")
                {
                    $scope.worldcontent.iframe = false; 
                    $scope.worldcontent.content = "";
                    
                    $http({
                    method: 'GET',
                    url: 'https://axhav.github.io/eldrathil-campaign/content/faq.json'
                    }).then(function(httpresults)
                    {
                        var results = httpresults.data; 
                        $scope.questions = [];
                        for(var player in results) 
                        {
                            $scope.questions.push(results[player]);
                        }
                    },function(error){
                        console.log(error)
                    });

                    
                }

            }
        }
    ]);

}());