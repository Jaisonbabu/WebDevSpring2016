(function() {

    angular
        .module("BonAppetitApp")
        .factory("SearchService", SearchService);

    function SearchService($http, $rootScope, $location) {

        var searchService = {
            fetchResult: fetchResult

        };

        return searchService;


        function fetchResult(responseHandler){

            var url = "https://api.locu.com/v2/venue/search/";
            var data = {
                headers: {  'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods' : 'GET,PUT,POST,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, X-Requested-With'},
                api_key : "9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368",
                fields : [ "name", "location", "contact" ],
                venue_queries : [
                    {
                        name : "bistro"
                    }
                ]
            };

            $http.defaults.useXDomain = true;
            //  $http.post(url,JSON.stringify(data)).success(responseHandler);


            $http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods' : 'GET,PUT,POST,OPTIONS',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, X-Requested-With'},
                data: {
                    api_key : "9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368",
                    fields : [ "name", "location", "contact" ],
                    venue_queries : [
                        {
                            name : "bistro"
                        }
                    ]
                }

            }).success(responseHandler)

        }

    }

})();

