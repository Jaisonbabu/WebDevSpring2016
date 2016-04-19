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
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
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
                    checkLoggedIn: checkLoggedIn
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
})();