var app = angular.module('todoApp', []);

app.controller("UserController", ["$http", "$scope", function($http, $scope) {
    $scope.user = {
        username: "akakorun"
    }

    $scope.facebookLogin = function() {
        $http.get("http://graph.facebook.com/" + $scope.user.username)
            .success(function(data) {
                console.log("Get Success!", data);
                $scope.user.fbData = data;
                saveUserToStorage();
            })
            .error(function (data) {
                console.log("Network error!", data);
            })
    }
    $scope.logout = function() {
        $scope.user = {};
        removeUserFromStorage();
    }

    /*
     Private functions
     */
    function saveUserToStorage() {
        try {
            localStorage.setItem("userData", JSON.stringify($scope.user));
            console.log("Saved user to local Storage", $scope.user, localStorage);
        } catch(ex) {
            console.log(ex);
        }

    }
    function removeUserFromStorage() {
        try {
            localStorage.setItem("userData", "{}");
        } catch(ex) {
            console.log(ex);
        }

    }
}]);
app.controller("NotesController", function($scope) {
    $scope.notes = [
        {
            text: "Default note",
            author: "akakorun",
            date: '1403695148319'
        },
        {
            text: "Seccond note",
            author: "tastatura",
            date: "1403695207994"
        }
    ];

    /*
     Private functions
     */
    function saveNotesToStorage() {
        try {
            localStorage.setItem("notesData", JSON.stringify($scope.user));
        } catch(ex) {
            console.log(ex);
        }

    }
    function removeNotesFromStorage() {
        try {
            localStorage.setItem("notesData", "{}");
        } catch(ex) {
            console.log(ex);
        }

    }
});

app.directive('dirUserLogin', function() {
    function link(scope, element, attrs) {
        var user = localStorage.getItem("userData");
        if(user) scope.user = JSON.parse(user);
    };


    return {
        restrict: 'E',
        templateUrl: "partials/login.html",
        controller: "UserController",
        link: link
    }
});
app.directive('dirNotesMain', function() {


    return {
        restrict: 'E',
        templateUrl: 'partials/notes-main.html',
        controller: "NotesController"
    }
})