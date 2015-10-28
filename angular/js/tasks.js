/* 
    script for the tasks.html file 
*/
angular.module('Tasks', [])
    .constant('tasksKey', 'tasks')  //set your constants
    .controller('TasksController', function($scope, tasksKey) {
        //dependency injection - person calling fcn should just pass in what they need and the
        //designer should initialize it
        
        //add some variables on scope so that our html has access to that information

        //overall array for every task
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];
        $scope.newTask = {};

        function saveTasks() {
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }

        $scope.addTask = function () {
            $scope.tasks.push($scope.newTask);

            saveTasks();

            $scope.newTask = {};
        };

        $scope.toggleDone = function (task) {
            task.done = !task.done;
            saveTasks();
        }
    });
