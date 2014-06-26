(function () {
    app.directive('notesMain', function () {
        function link(scope, element, attrs) {
            var notes = localStorage.getItem("notesData");
            if (notes) scope.notes = $.parseJSON(notes);

            element.find("input").bind("keydown", function (e) {
                if (e.which == "13") {
                    if (scope.state.editingNote) {
                        scope.finishEditing();
                    } else {
                        scope.addNote();
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
    })
})();
