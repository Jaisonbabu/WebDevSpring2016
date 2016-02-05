/**
 * Created by Jaison89 on 2/3/2016.
 */

(function()
{
    ($init);

    var $movieTitle ;
    var $searchButton ;/// id of button

    function init(){
        var $movieTitle = $("#movietitle");
        var $searchButton =  $("#searchMovie");/// id of button
        var $tbody =
        var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE";

        $searchmovieBtn.click(searchMovie);

    }
    function searchmovie(){
        var movieTitle = $movieTitle.val();
        var url = searchUrl.replace("TITLE",movieTitle).replace("PAGE",1);
        $.ajax({
            url:url,
            success : renderMovieList
        })
    }

    function renderMovieList(response){
        console.log(response);
        var movies = response.Search;

        for (var m=0; m<movies.length ; m++){
            var title = movie.Title;
            var imdbid = movie.imdbID;
            var poster = movie.Poster;

            var $tr = $("<tr>");

            var $img = $("<img>")
                .attr("src",poster)
                .addClass("poster")
                .attr("id", imdb);
                .click(searchMovieDetails);  /// call this function for the $event

            var $td = $("<td>");
           `$td.append($img);
            $tr.append($td);

            $td = $("<td>").append(title);
            $tr.append($td);

            $td = $("<td>").append(imdbid);
            $tr.append($td);

            $tbody.append($tr);


        }

    }

})();

