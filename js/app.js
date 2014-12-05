"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

var baseUrl = 'https://api.parse.com/1/classes/comments';

angular.module('review', ['ui.bootstrap'])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'vEKP8fXUoI63EczduB4VfwfnQmhwKXkScbQsGiDy';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'JomRQU7xqTlREKDY7f2rcssCzeHt7LQX1KEyMf2l';
    })

    .controller('reviewController', function($scope, $http) {
        // to handle rating
        $scope.max = 5;
    
        $scope.hoveringOver = function(value) {
          $scope.overStar = value;
        };
    
     // to reload page
        $scope.refreshComment = function() {
            $scope.loading = true;
            $http.get(baseUrl + '?where={"done" : false}')
                .success(function(responseData) {
                    $scope.comments = responseData.results;
                    console.log($scope.comments);
                })

                .error(function(err) {
                    console.log(err);
                    //notify the user in some way
                })

                .finally(function() {
                    $scope.loading = false;
                });
        }; // refresh comments
    
        $scope.refreshComment();
    
        //to post comments
        $scope.newComment = {done : false};
    
        $scope.addComment = function() {
            $scope.inserting = true;
            $http.post(baseUrl, $scope.newComment) 
                .success(function(responseData) {
                    $scope.newComment.objectId = responseData.objectId;
                    $scope.comments.push($scope.newComment);
                    $scope.newComment = {done: false};
                    $scope.newComment.score = 0;
                })
                .finally(function() {
                    $scope.inserting = false;
            });
        }; // add comment
    
        $scope.incrementVotes = function(comment, amount) {
                var postData = {
                    score: {
                        __op: "Increment",
                        amount: amount
                    }
                };

                $scope.updating = false;
                $http.put(baseUrl + '/' + comment.objectId, postData)
                    .success(function(responseData) {
                        comment.score = responseData.score;
                    })
                    .error(function(err) {
                        console.log(err);
                    })
                    .finally(function() {
                        $scope.updating = false;
                    });
            }; //scores
    
        $scope.deleteComment = function(comment) {
            comment.done = true;
            $http.delete(baseUrl + '/' + comment.objectId);
            var timeoutCode;
            var delayInMs = 1000;
            timeoutCode = setTimeout(function() {
                 $scope.refreshComment();
            }, delayInMs);
        };
    

           
}); // end controller