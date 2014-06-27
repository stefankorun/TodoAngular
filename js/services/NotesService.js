(function() {
    app.service('notesService', function () {
        var service = {};

        service.notes = [];

        service.addNote = function (note) {
            this.notes.push(note);
            saveNotesToStorage();
        }
        service.editNote = function (index, data) {
            this.notes[index] = data;
            saveNotesToStorage();
        }
        service.removeNote = function (index) {
            this.notes.splice(index, 1);
            saveNotesToStorage();
        }
        service.clearNotes = function () {
            this.notes = [];
            removeNotesFromStorage();
        }
        service.getNotes = function () {
            return this.notes;
        }
        service.setNotesFromJSON = function(json) {
            try {
                this.notes = $.parseJSON(json);
            } catch (ex) {
                removeNotesFromStorage();
            }
            saveNotesToStorage();
        }

        return service;


        /*
         Private functions
         */
        function saveNotesToStorage() {
            try {

                localStorage.setItem("notesData", angular.toJson(service.notes));
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
    })
})();