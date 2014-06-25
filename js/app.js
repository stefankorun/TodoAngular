var app = angular.module('todoApp', []);

app.directive('dirUserLogin', function() {
    function controller($http, $scope) {
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
    };

    function link(scope, element, attrs) {
        var user = localStorage.getItem("userData");
        if(user) scope.user = JSON.parse(user);
    }



    return {
        restrict: 'E',
        templateUrl: "partials/login.html",
        controller: ["$http", "$scope", controller],
        link: link
    }
});