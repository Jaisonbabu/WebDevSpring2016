(function(){
    angular
        .module("BonAppetitApp")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {

        //$httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.withCredentials = true;
        //delete $httpProvider.defaults.headers.common["X-Requested-With"];
        //$httpProvider.defaults.headers.common["Accept"] = "application/json";
        //$httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
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
                controller: "LoginController"
            })
            .when("/api/search/:id", {
                templateUrl: "views/detail/hotel.detail.view.html",
                controller: "HotelDetailController"
            })
            .otherwise({
                redirectTo: "/"
            });


    }
})();