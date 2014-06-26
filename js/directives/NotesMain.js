(function () {
    app.directive('notesMain', ["notesService", function (notesService) {
        function link(scope, element, attrs) {
            var notesJSON = localStorage.getItem("notesData");
            if (notesJSON) notesService.setNotesFromJSON(notesJSON);

            element.find("input").bind("keydown", function (e) {
                if (e.which == "13") {
                    if (scope.state.editingNote) {
                        scope.finishEditing();
                    } else {
                        scope.addNote();
                        //TODO ova da se mafnit od ovde
                        scope.$apply();
                    }
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
})();
