(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController"
                //resolve:{
                //    checkLoggedIn: checkCurrentUser
                //}
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                resolve: {
                    checkLoggedIn: checkAdmin
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController"

            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields",{
                templateUrl:"views/forms/field.view.html",
                controller: "FieldController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/"
            });

        var checkAdmin = function($q, $http, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    console.log("admin found");
                    $rootScope.user = user;
                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        function getLoggedIn(UserService, $q) {
            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function(response){
                    var currentUser = response.data;
                    UserService.setUser(currentUser);
                    deferred.resolve();
                });

            return deferred.promise;
        }

        function checkLoggedIn(UserService, $q, $location) {

            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/");
                    }
                });

            return deferred.promise;
        }


        var checkCurrentUser = function($q, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.currentUser = user;
                }
                deferred.resolve();
            });

            return deferred.promise;
        };

    }
})();