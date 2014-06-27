(function () {
    app.directive('notesMain', ["notesService", function (notesService) {
        function link($scope, element, attrs) {
            var notesJSON = localStorage.getItem("notesData");
            if (notesJSON) notesService.setNotesFromJSON(notesJSON);

            element.find("input").bind("keydown", function (e) {
                if (e.which == "13") {
                    //ENTER
                    $scope.$apply(function () {
                        if ($scope.state.editingNote) {
                            $scope.finishEditing();
                        } else {
                            $scope.addNote();
                        }
                    })
                } else if (e.which == "27") {
                    //ECS
                    $scope.cancelEditing();
                }
            })
        };

        return {
            restrict: 'E',
            templateUrl: 'partials/notes-main.html',
            link: link,
            controller: "NotesController"
        }
    }])


    app.directive('modifyInputFocus', function () {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                $scope.$watch(function () {
                    return $scope.state.editingNote
                }, function(newVal, oldVal) {
                    if(newVal) element.focus();
                })
            }
        }
    })
})();
