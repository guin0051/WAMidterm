var app = angular.module('TaskManager', []);


app.controller('taskController', function ($scope) {
    $scope.today = new Date();
    $scope.saved = localStorage.getItem('taskItems');
    $scope.taskItem = (localStorage.getItem('taskItems') !== null) ?
        JSON.parse($scope.saved) : [{
            description: "Create a new task?",
            date: $scope.today,
            complete: false
        }];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));

    /* Task list and functions */
    $scope.newTask = null;
    $scope.newTaskDate = null;
    $scope.categories = [
        {
            name: 'Personal'
        },
        {
            name: 'Work'
        },
        {
            name: 'School'
        },
        {
            name: 'Cleaning'
        },
        {
            name: 'Other'
        }
    ];

    /* DELETE BUTTON FUNCTION */
    $scope.deleteTask = function () {
        var completedTask = $scope.taskItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

    /* ADD TASK BUTTON FUNCTION */
    $scope.newTaskCategory = $scope.categories;
    $scope.addNew = function () {
        if ($scope.newTaskDate == null || $scope.newTaskDate == '') {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: "No deadline",
                complete: false,
                category: $scope.newTaskCategory.name
            })
        } else {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: $scope.newTaskDate,
                complete: false,
                category: $scope.newTaskCategory.name
            })
        };
        $scope.newTask = '';
        $scope.newTaskDate = '';
        $scope.newTaskCategory = $scope.categories;
        $scope.editing = $scope.taskItem.indexOf(item);
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

    /* EDIT TASK DESCRIPTIONS */
    $scope.editTask = function (taskItem) {
        $scope.editMode = true;
        $scope.newTask = angular.copy(taskItem);
        $scope.currentItemIndex = $scope.taskItems.indexOf(taskItem);
    };

    /* STRINGIFY FOR LOCAL TASK STORAGE */
    $scope.save = function () {
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    }
});