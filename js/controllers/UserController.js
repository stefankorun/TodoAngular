(function () {
    app.controller("UserController", ["$http", "$scope", "userService", function ($http, $scope, userService) {
        $scope.user = {
            username: "akakorun",
            fbData: null
        };

        $scope.login = function () {
            userService.user.username = $scope.user.username;
            userService.facebookLogin().then(
                function (data) {
                    $scope.user.fbData = data;
                });
        }
        $scope.logout = function () {
            $scope.user.fbData = null;
            userService.logout();
        }
    }]);
})();
