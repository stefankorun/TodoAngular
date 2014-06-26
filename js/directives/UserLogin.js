(function() {
    app.directive('userLogin', ["userService", function (userService) {
        function link(scope, element, attrs) {
            var userData = userService.checkSession();
            scope.user = userData;
        };

        return {
            restrict: 'E',
            templateUrl: "partials/login.html",
            controller: "UserController",
            link: link
        }
    }]);
})();