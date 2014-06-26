(function () {
    app.service('mongolabService', ["$http", "$q", function ($http, $q) {
        var service = {};

        var mongoUrl = "http://api.mongolab.com/api/1";
        var mongoApiKey = "q4t8iDkrz59rQ-o_U8CEVH06UXdm9k8w";
        var mongoDbName = "todo_angularjs";

        service.getGlobalNotes = function () {
            var mongoCollName = "global_notes";
            //https://api.mongolab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey;
            var url = mongoUrl +
                "/databases/" + mongoDbName +
                "/collections/" + mongoCollName +
                "?callback=JSON_CALLBACK" +
                "&fo=true" +
                "&apiKey=" + mongoApiKey;

            $http({method: 'jsonp', url: url, callback: 'JSON_CALLBACK'})
                .success(function (data, status, headers, config) {
                    console.log("1");
                    console.log(data);
                })
                .error(function (data) {
                    console.log(data);
                })
        };

        return service;
    }]);
})();