(function() {
    app.directive('userLogin', function () {
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
})();