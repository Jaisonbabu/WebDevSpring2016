(function() {

    angular
        .module("BonAppetitApp")
        .factory("SearchService", SearchService);

    function SearchService($http, $rootScope, $location) {
        $http.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=utf-8';
        var searchService = {
            fetchResult: fetchResult

        };

        return searchService;


        function fetchResult(responseHandler){
            console.log("In fetchresult");
           // var url = "https://api.locu.com/v1_0/venue/search/?name=pizza&locality=Boston&api_key=9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368";
           // var url = "https://api.locu.com/v2/venue/search/";
           // var dataa = {
           //     headers: {  'Content-Type': 'application/json',
           //         'Access-Control-Allow-Origin':'*',
           //         'Access-Control-Allow-Methods' : 'GET,PUT,POST,OPTIONS',
           //         'Access-Control-Allow-Headers': 'Content-Type, Content-Length, X-Requested-With'},
           //     api_key : "9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368",
           //     fields : [ "name", "location", "contact" ],
           //     venue_queries : [
           //         {
           //             name : "bistro"
           //         }
           //     ]
           // };
           //
           //
           // //  $http.post(url,JSON.stringify(data)).success(responseHandler);
           //
            var data = {

                fields : [ "name", "location", "contact", "menus","media" ],
                venue_queries : [
                    {
                        name : "bistro"
                    }
                ]
            };

            //$http.post(url, JSON.stringify(data))
            //    .success(responseHandler);

            //$http.get("https://api.locu.com/v1_0/venue/search/?name=pizza&locality=Boston&api_key=9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368&format=json")
            //    .success(responseHandler);

            //$http({
            //    method: 'JSONP',
            //    url: url + '&callback=JSON_CALLBACK',
            //    type:'GET'
            //}) .success(responseHandler);

            //$http.defaults.useXDomain = true;
            //$http({
            //    method: 'POST',
            //    url: url,
            //    headers: {
            //        'Content-Type': 'application/json',
            //        'Access-Control-Allow-Origin':'*',
            //        'Access-Control-Allow-Methods' : 'GET,PUT,POST,OPTIONS',
            //        'Accept': '*/*',
            //        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, X-Requested-With'},
            //    data: JSON.stringify(data)
            //
            //
            //}).success(responseHandler);
            //
            //var post_options = {
            //    host: 'https://api.locu.com/v2/venue/search/',
            //    path: '/project',
            //    method: 'POST',
            //    headers: {
            //        'Content-Type': 'application/x-www-form-urlencoded'
            //        //'Content-Length': Buffer.byteLength(post_data)
            //    },
            //    data :{
            //        api_key : "9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368",
            //        fields : [ "name", "location", "contact" ],
            //        venue_queries : [
            //            {
            //                name : "bistro"
            //            }
            //        ]
            //    }
            //};
            //$http.post('/Project', {id:"test"})
            //    .success(responseHandler);
            $http({
                url:"/Project",
                method:"POST",
                data:data,
                headers: {
                            'Content-Type': 'application/json'
                            //'Content-Length': Buffer.byteLength(post_data)
                        }
            }).then(responseHandler,function(response){
                console.log("Error");
            });
        }

    }

})();

