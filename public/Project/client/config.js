(function(){
    angular
        .module("BonAppetitApp")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {

        //$httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController",
                controllerAs: "model"
                //resolve: {
                //    checkCurrentUser: checkCurrentUser
                //}
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController"

            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/api/search/:id", {
                templateUrl: "views/detail/hotel.detail.view.html",
                controller: "HotelDetailController"
            })
            .when("/favorite", {
                templateUrl: "views/users/favorite.view.html",
                controller: "FavoriteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/review", {
                templateUrl: "views/users/review.view.html",
                controller: "ReviewController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/find", {
                templateUrl: "views/users/find.view.html",
                controller: "FindController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/api/profile/:username/profile", {
                templateUrl: "views/users/public.profile.view.html",
                controller: "PublicProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/api/profile/:username/favorite", {
                templateUrl: "views/users/public.favorite.view.html",
                controller: "PublicFavoriteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/api/profile/:username/review", {
                templateUrl: "views/users/public.review.view.html",
                controller: "PublicReviewController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    }

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

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get("/api/project/loggedin").success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
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

})();