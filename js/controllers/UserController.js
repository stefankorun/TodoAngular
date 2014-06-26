(function () {
    app.controller("UserController", ["$http", "$scope", "userService", "mongolabService",
        function ($http, $scope, userService, mongolabService) {


        $scope.testMongo = function () {
            mongolabService.getGlobalNotes();
        }

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
