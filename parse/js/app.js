/*
    script for the index.html file
*/
Parse.initialize("cKWO0k4diyiFfz4Y2dXLzrYwj71RXTjMdfG4xkKX", "m1d1fK0LPw8I3zP1WBoeUVWY61i6U0AEoKk2emd0");
$(function () {
    'use strict';
    
    //mongoDB defines classes instead of tables, 
    //not all "rows" need to have the same set of properties
    //mongoDB is a little more flexible than sql
    var Task = Parse.Object.extend('Task'); //<== this is our "table name"
    //new query that will return all tasks ordered by createdAt
    var taskQuery = new Parse.Query(Task);
    taskQuery.ascending('createdAt');

    //reference to the task list element
    var tasksList = $('#tasks-list');

    //reference to the error message alert
    var errorMessage = $('#error-message');

    //current set of tasks
    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa').show();
    }
    function hideSpinner() {
        $('.fa').hide();
    }

    function fetchTasks() {
        showSpinner();
        taskQuery.find()    //is the 2nd param like ".catch()"?
            .then(onData, displayError)
            .always(hideSpinner);
    }

    function onData(results) {
        //results is an array on tasks from server
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();  
        tasks.forEach(function (task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    //when the user submits the new task form
    $('#new-task-form').submit(function (evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.save()
            .then(fetchTasks, displayError)
            .then(function () {
                titleInput.val(' ');
            });

        //same as prevent default
        return false;
    });

    //get tasks from the server
    fetchTasks();

    window.setInterval(fetchTasks, 5000);
})