(function() {

    angular
        .module("BonAppetitApp")
        .factory("SearchService", SearchService);

    function SearchService($http, $rootScope, $location) {
        $http.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=utf-8';
        var searchService = {
            fetchResult: fetchResult,
            getSearchDetail:getSearchDetail,
            userSearch:userSearch
        };

        return searchService;


        function getSearchDetail(resId){
            return $http.get("/api/search/"+resId);
        }

        function fetchResult(){
            return $http.get("/api/search");
        }

        function userSearch(){
            return $http.get("/api/search");
        }

    }

})();

