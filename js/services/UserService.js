(function () {
    app.service('userService', ["$http", "$q", function ($http, $q) {
        var service = {
            user: {
                username: "akakorun",
                fbData: null
            }
        };

        service.getUser = function()
        {
            return this.user;
        }
        service.facebookLogin = function () {
            var deferred = $q.defer();
            $http.get("http://graph.facebook.com/" + this.user.username)
                .success(function (data) {
                    console.log("Request success!", data);
                    service.user.fbData = data;
                    saveUserToStorage();
                    deferred.resolve(data);
                })
                .error(function (data) {
                    console.log("Network error!", data);
                    deferred.reject("There was and error.");
                })
            return deferred.promise;
        }
        service.logout = function () {
            this.user.fbData = null;
            removeUserFromStorage();
        }
        service.checkSession = function () {
            var user = localStorage.getItem("userData");
            if (user) this.user = $.parseJSON(user);

            return this.user;
        }
        return service;


        /*
         Service private functions
         */
        function saveUserToStorage() {
            var that = this;
            try {
                localStorage.setItem("userData", angular.toJson(service.user));
                console.log("Saved user to local Storage", service.user, localStorage);
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