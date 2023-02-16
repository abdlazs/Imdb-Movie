function searchMovie() {
  $("#MovieList").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "f927dde2",
      s: $("#inputSearch").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movie = result.Search;
        console.log(movie);
        $.each(movie, function (i, data) {
          // var imdbId = data.imdbID;
          // console.log(imdbId);
          $("#MovieList").append(
            `
          <div class="col-md-3">
            <div class="card mb-3" style="width: 18rem;">
                <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">` +
              data.Title +
              `</h5>
                    <h6 class="card-subtitle mb-2 text-muted"><strong>Year : </strong>` +
              data.Year +
              `</h6>
                    <a href="#" class="card-link detaill" data-toggle="modal" data-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Detail</a>
                    <a href="#" class="card-link stream" data-stream="` +
              data.imdbID +
              `">Stream</a>
                </div>
            </div>
          </div>`
          );
        });

        $("#inputSearch").val("");
      } else {
        $("#MovieList").html(
          '<div class="col"><h1 class="text-center">' +
            result.Error +
            "</h1></div>"
        );
      }
    },
  });
}

// onClick Button
$("#btnMovie").on("click", function () {
  searchMovie();
});

// onEnter
$("#inputSearch").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

// Modall
$("#MovieList").on("click", ".detaill", function () {
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "f927dde2",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response == "True") {
        $(".modal-body").html(
          `
            <div class="container-fluid">
            <div class="row">
      <div class="col-md-4">
        <img src="` +
            movie.Poster +
            `" class="img-fluid" />
      </div>
      <div class="col-md-8">
          <ul class="list-group">
              <li class="list-group-item">
                  <h5 class="text-center">` +
            movie.Title +
            `</h5>
              </li>
              <li class="list-group-item"><strong>Release : </strong>` +
            movie.Released +
            `</li>
              <li class="list-group-item"><strong>Genre : </strong>` +
            movie.Genre +
            `</li>
              <li class="list-group-item"><strong>Directors : </strong>` +
            movie.Director +
            `</li>
              <li class="list-group-item"><strong>Actors : </strong>` +
            movie.Actors +
            `</li>
          </ul>
      </div>
    </div>
            </div>
            `
        );
      }
    },
  });
});

$("#MovieList").on("click", ".stream", function () {
  let imdbID = $(this).data("stream");
  window.open("https://fembed.ro/embed/" + imdbID);
});
