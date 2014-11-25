"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

var baseUrl = 'https://api.parse.com/1/classes/';

angular.module('review', [])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'vEKP8fXUoI63EczduB4VfwfnQmhwKXkScbQsGiDy';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'JomRQU7xqTlREKDY7f2rcssCzeHt7LQX1KEyMf2l';
    })

    .controller('reviewController', function($scope, $http) {
    
}); // end controller