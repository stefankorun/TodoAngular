(function () {
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
                    $scope.$apply(function () {
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
})();
