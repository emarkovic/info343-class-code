/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function (uuid, localStorageService, storageKey) {
        // return [{
        //     id : 'default-delete-me',
        //     fname : 'Fred',
        //     lname : 'Flinstone',
        //     phone : '206-555-1212',
        //     dob : '1/1/1900'
        // }];
        return localStorageService.get(storageKey) || [];
    })
    .factory('saveContacts', function (localStorageService, storageKey) {
        return function (contacts) {
            localStorageService.set(storageKey, contacts);
        }
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url : '/contacts',
                templateUrl : 'views/contacts-list.html',
                controller : 'ContactsController'
            })
            .state('detail', {
                            // ':' says at the end of url put id on unique contact
                url : '/contacts/:id',
                templateUrl : 'views/contact-detail.html',
                controller : 'ContactDetailController'
            })
            .state('edit', {
                url : '/contacts/:id/edit',
                templateUrl : 'views/edit-contact.html',
                controller : 'EditContactController'
            });
        $urlRouterProvider.otherwise('/contacts');
    })
    //register a directive for customer validation on dates in the past
    .directive('inThePast', function () {    
        return {
            require : 'ngModel',
            link : function (scope, elem, attrs, controller) {
                controller.$validators.inThePast = function (modelValue) {
                    var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })
    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
                                                        //what is stateParams?
    .controller('ContactDetailController', function ($scope, $stateParams, $state, saveContacts, contacts) {
        $scope.contact = contacts.find(function (contact) {
            return contact.id === $stateParams.id;
        });

        $scope.deleteContact = function() {
            contacts.forEach(function (contact, i) {
                if (contact.id === $stateParams.id) {
                    contacts.splice(i, 1)
                }
            });          
            console.log(contacts);
            saveContacts(contacts);
        }

        
    })
    .controller('EditContactController', function ($scope, $stateParams, $state, uuid, localStorageService, storageKey, contacts) {
        var existingContact = contacts.find(function (contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function () {
            if ($scope.contact.id) {
                angular.copy($scope.contact, existingContact);    
            } else {
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact);
            }
            
            localStorageService.set(storageKey, contacts);

            $state.go('list');
        }        
    })

