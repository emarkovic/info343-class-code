angular.module('Movies', ['ui.router'])
    .factory('moviesJson', function ($http) {
        return $http.get('data/movies-2014.min.json');
    })
    //for entire modile
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url : '/movies',
                templateUrl : 'views/movies-list.html',
                controller : 'MoviesController'
            })
            .state('detail', {
                url : '/movies/:index',
                templateUrl : 'views/movies-detail.html',
                controller : 'MoviesDetailController'
            });
            $urlRouterProvider.otherwise('/movies');
    })
    .controller('MoviesDetailController', function ($scope, $stateParams, moviesJson) {
        moviesJson
            .then(function (results) {
                $scope.movie = results.data[$stateParams.index];
            })
    })
                    //need http for ajax requests in angular
    .controller('MoviesController', function ($scope, moviesJson) {
        
        moviesJson
            .then(function (results) {
                var ratingsMap = {
                    "Not Rated" : 0,
                    "G" : 1,
                    "PG" : 2,
                    "PG-13" : 3,
                    "R" : 4,
                    "NC-17" : 5,
                    "X" : 6
                }

                $scope.movies = results.data.map(function(movie) {
                    movie.ratingOrdinal = ratingsMap[movie.rating];
                    return movie;
                });

                $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));
            });

        $scope.setSort = function(propertyName) {
            if ($scope.sortCol === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCol = propertyName;    
                $scope.sortReverse = false;
            }
            
        }
    });