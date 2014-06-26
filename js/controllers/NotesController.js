(function () {
    app.controller("NotesController", ["$scope", "notesService", function ($scope, notesService) {
        var prevText;

        $scope.state = {
            editingNote: false
        }
        $scope.text = "";
        $scope.notes = [];

        $scope.startEditing = function () {
            prevText = $scope.text;
            $scope.text = this.note.text;
            $scope.state.editingNote = this;
        }
        $scope.finishEditing = function () {
            var editingNote = $scope.state.editingNote;
            notesService.editNote(editingNote.$index, {
                text: $scope.text
            });
            $scope.state.editingNote = false;
            $scope.text = prevText;
            $scope.$apply();
        }
        $scope.addNote = function () {
            if ($scope.text.length < 1) return;
            notesService.addNote({
                text: $scope.text
            })
            $scope.text = '';
        }
        $scope.removeMe = function () {
            notesService.removeNote(this.$index);
        }
        $scope.clearNotes = function () {
            notesService.clearNotes();
        }
        $scope.updateNotes = function () {
            return $scope.notes = notesService.getNotes();
        }
    }]);
})();