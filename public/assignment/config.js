(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
                controller:"home.controller"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "forms.controller"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "profile.controller"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "admin.controller"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "register.controller"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "login.controller"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();