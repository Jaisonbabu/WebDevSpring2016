(function() {

    angular
        .module("BonAppetitApp")
        .factory("SearchService", SearchService);

    function SearchService($http, $rootScope, $location) {
        $http.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=utf-8';
        var searchService = {
            fetchResult: fetchResult,
            getSearchDetail:getSearchDetail,
            userSearch:userSearch,
            addReview:addReview,
            getReviewsByResId:getReviewsByResId
        };

        return searchService;


        function getSearchDetail(resId){
            return $http.get("/api/project/search/"+resId);
        }

        function fetchResult(pos){
            console.log(pos);
            return $http.get("/api/project/location/search?lat="+pos.lat+"&lng"+pos.lng);
        }

        function userSearch(search){
            return $http.get("/api/project/query/search?query="+search.query+"&loc"+search.place);
        }

        function addReview(review){
            return $http.post("/api/project/review",review,{headers: {'Content-Type': 'application/json'} });
        }

        function getReviewsByResId(resId){
            return $http.get("/api/project/restaurant/review/"+resId);
        }
    }

})();

