var app = angular.module('todoApp', []);

app.controller("UserController", ["$http", "$scope", function ($http, $scope) {
    $scope.user = {
        username: "akakorun"
    }

    $scope.facebookLogin = function () {
        $http.get("http://graph.facebook.com/" + $scope.user.username)
            .success(function (data) {
                console.log("Get Success!", data);
                $scope.user.fbData = data;
                saveUserToStorage();
            })
            .error(function (data) {
                console.log("Network error!", data);
            })
    }
    $scope.facebookJQueryLogin = function () {
        $.get("http://graph.facebook.com/" + $scope.user.username)
            .success(function (data) {
                console.log("Get Success!", data);
                $scope.$apply(function() {
                    $scope.user.fbData = data;
                });
                saveUserToStorage();
            })
            .error(function (data) {
                console.log("Network error!", data);
            })
    }
    $scope.logout = function () {
        $scope.user.fbData = null;
        removeUserFromStorage();
    }

    /*
     Private functions
     */
    function saveUserToStorage() {
        try {
            localStorage.setItem("userData", angular.toJson($scope.user));
            console.log("Saved user to local Storage", $scope.user, localStorage);
        } catch (ex) {
            console.log(ex);
        }

    }

    function removeUserFromStorage() {
        try {
            localStorage.removeItem("userData");
        } catch (ex) {
            console.log(ex);
        }
    }
}]);
app.controller("NotesController", function ($scope) {
    $scope.notes = [];

    $scope.addNote = function () {
        if($scope.text.length < 1) return;
        $scope.notes.push({
            text: $scope.text
        });
        $scope.text = '';
        saveNotesToStorage();
    }
    $scope.removeMe = function() {
        $scope.notes.splice(this.$index, 1);
        saveNotesToStorage();
    }
    $scope.clearNotes = function () {
        $scope.notes = [];
        removeNotesFromStorage();
    }
    $scope.clearInput = function () {
        $scope.text = "";
    }


    /*
     Private functions
     */
    function saveNotesToStorage() {
        try {
            localStorage.setItem("notesData", angular.toJson($scope.notes));
        } catch (ex) {
            console.log(ex);
        }

    }
    function removeNotesFromStorage() {
        try {
            localStorage.removeItem("notesData");
        } catch (ex) {
            console.log(ex);
        }

    }
});

app.directive('dirUserLogin', function () {
    function link(scope, element, attrs) {
        var user = localStorage.getItem("userData");
        if(user) scope.user = $.parseJSON(user);
    };


    return {
        restrict: 'E',
        templateUrl: "partials/login.html",
        controller: "UserController",
        link: link
    }
});
app.directive('dirNotesMain', function () {
    function link(scope, element, attrs) {
        var notes = localStorage.getItem("notesData");
        if(notes) scope.notes = $.parseJSON(notes);

        element.find("input").bind("keydown", function(e) {
            if(e.which == "13") {
                scope.addNote();
                scope.$apply();
            }
        })
    };

    return {
        restrict: 'E',
        templateUrl: 'partials/notes-main.html',
        link: link,
        controller: "NotesController"
    }
})