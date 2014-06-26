(function () {
    app.controller("NotesController", function ($scope) {
        $scope.state = {
            editingNote: false
        }
        $scope.notes = [];

        $scope.startEditing = function() {
            $scope.prevText = $scope.text;
            $scope.text = this.note.text;

            $scope.state.editingNote = this;
        }
        $scope.finishEditing = function() {
            var editingNote = $scope.state.editingNote;
            editingNote.note.text = $scope.text;
            $scope.text = editingNote.prevText;
            $scope.state.editingNote = false;
            $scope.$apply();
            saveNotesToStorage();
        }
        $scope.addNote = function () {
            if($scope.text.length < 1) return;
            $scope.notes.push({
                text: $scope.text
            });
            $scope.text = '';
            saveNotesToStorage();
        }
        $scope.removeMe = function() {
            $scope.notes.splice(this.$index, 1);
            saveNotesToStorage();
        }
        $scope.clearNotes = function () {
            $scope.notes = [];
            removeNotesFromStorage();
        }
        $scope.clearInput = function () {
            $scope.text = "";
        }

        /*
         Private functions
         */
        function saveNotesToStorage() {
            try {
                localStorage.setItem("notesData", angular.toJson($scope.notes));
            } catch (ex) {
                console.log(ex);
            }

        }
        function removeNotesFromStorage() {
            try {
                localStorage.removeItem("notesData");
            } catch (ex) {
                console.log(ex);
            }

        }
    });
})();