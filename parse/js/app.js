/*
    script for the index.html file
*/
<<<<<<< HEAD
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
=======


//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
<<<<<<< HEAD
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
=======
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function onData(results) {
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
<<<<<<< HEAD
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
=======
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
