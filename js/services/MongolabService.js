(function () {
    app.service('mongolabService', ["$http", "$q", function ($http, $q) {
        var service = {};

        var mongoUrl = "https://api.mongolab.com/api/1";
        var mongoApiKey = "q4t8iDkrz59rQ-o_U8CEVH06UXdm9k8w";
        var mongoDbName = "todo_angularjs";

        service.getGlobalNotes = function () {
            var mongoCollName = "global_notes";
            var url = mongoUrl +
                "/databases/" + mongoDbName +
                "/collections/" + mongoCollName +
                "?apiKey=" + mongoApiKey;

            $http({
                method: 'GET',
                url: url
            })
                .success(function (data, status, headers, config) {
                    console.log("Success", data);
                })
                .error(function (data) {
                    console.log("Error", data);
                })
        };

        service.addNote = function (note) {
            var mongoCollName = "global_notes";
            var url = mongoUrl +
                "/databases/" + mongoDbName +
                "/collections/" + mongoCollName +
                "?apiKey=" + mongoApiKey;

            $http({
                method: 'POST',
                url: url,
                data: note
            })
                .success(function (data, status, headers, config) {
                    console.log("Success", data);
                })
                .error(function (data) {
                    console.log("Error", data);
                })
        };



        return service;
    }]);
})();