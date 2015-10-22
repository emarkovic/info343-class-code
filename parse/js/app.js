/*
    script for the index.html file
*/
Parse.initialize("izmfRQS3ily2xTB6aGH2syFfJlqM4AsDmW6jnUDU", "GJEmoWjIPu1tM4lNbSzMGuwMswPd9DM3tF43M4cb");
$(function () {
    'use strict';
    
    //mongoDB defines classes instead of tables, 
    //not all "rows" need to have the same set of properties
    //mongoDB is a little more flexible than sql
    var Task = Parse.Object.extend('Task'); //<== this is our "table name"
    //new query that will return all tasks ordered by createdAt
    var taskQuery = new Parse.Query(Task);
    taskQuery.ascending('createdAt');
    taskQuery.notEqualTo('done', true);

    //reference to the task list element
    var tasksList = $('#tasks-list');

    //reference to the error message alert
    var errorMessage = $('#error-message');

    //current set of tasks
    var tasks = [];

    var ratingElem = $('#rating');

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spinner').show();
    }
    function hideSpinner() {
        $('.fa-spinner').hide();
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
            var li = $(document.createElement('li'))
                .text(task.get('title'))
                .addClass(task.get('done') ? 'completed-class' : '')
                .appendTo(tasksList)
                .click(function () {
                    console.log("clicked");
                    task.set('done', !task.get('done'));
                    task.save()
                        .then(renderTasks);
                })
            $(document.createElement('span'))
                .raty({
                    readOnly : true,
                    score: (task.get('rating') || 0),
                    hints : ['crap', 'bad', 'okay', 'nice', 'awesome']})
                .appendTo(li);
        });
    }

    // function showMessage(message) {
    //     message = message || 'hello';
    //     alert(message)
    // }

    //when the user submits the new task form
    $('#new-task-form').submit(function (evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('rating', ratingElem.raty('score'))
        task.set('title', title);
        task.save()
            .then(fetchTasks, displayError)
            .then(function () {
                titleInput.val(' ');
                ratingElem.raty('set', {});
            });

        //same as prevent default
        return false;
    });

    ratingElem.raty();

    //get tasks from the server
    fetchTasks();

    window.setInterval(fetchTasks, 5000);
})