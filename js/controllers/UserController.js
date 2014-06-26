(function () {
    app.controller("UserController", ["$http", "$scope", "userService", "mongolabService",
    function ($http, $scope, userService, mongolabService) {

        $scope.testMongo = function () {
            mongolabService.addNote("{'text':'asdasd'}");
        }

        $scope.user = {};

        $scope.user = userService.getUser();

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
