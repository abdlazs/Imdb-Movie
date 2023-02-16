function searchMovie(res) {
  $("#MovieList").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "f927dde2",
      s: res,
    },
    success: function (result) {
      if (result.Response == "True") {
        let movie = result.Search;
        $.each(movie, function (i, data) {
          $("#MovieList").append(
            `
            <div class="col-6 col-md-4 col-lg-3 column">
                <div class="card border-0 overflow-hidden h-100">
                    <div class="card-body p-0">
                        <img class="w-100 h-100" src="${data.Poster}">
                    </div>
                    <div class="card-footer" style="background-color: #ccd6f6; color: #020c1b">
                        <h5 class="card-title">${data.Title}</h5>
                        <h6 class="card-subtitle mb-2" style="color: #f3b700">
                            <strong>Year : </strong>${data.Year}
                        </h6>
                        <a href="#"  style="color: #020c1b" class="card-link detaill" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">Detail</a>
                    </div>
                </div>
            </div>`
          );
        });
        $("#inputSearch").blur();
      } else {
        let html = `
        <div class="col mt-3">
            <h5 class="text-center text-white">${result.Error}</h5>
        </div>
        `;
        $("#MovieList").html(html);
      }
    },
  });
}

// onClick Button
$("#btnMovie").on("click", function () {
  let res = $("#inputSearch").val();
  searchMovie(res);
});

// onEnter
$("#inputSearch").on("keyup", function (e) {
  if (e.keyCode === 13) {
    let res = $("#inputSearch").val();
    searchMovie(res);
  }
});
// window first load
window.addEventListener("load", function () {
  $("#inputSearch").val("");
  searchMovie("naruto");
});

// Modall
$("#MovieList").on("click", ".detaill", function (e) {
  e.preventDefault();
  let dataId = $(this).data("id");
  $.ajax({
    url: "http://omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "f927dde2",
      i: dataId,
    },
    success: function (movie) {
      if (movie.Response == "True") {
        $(".modal .modal-title").html(movie.Title);
        $(".modal-body").html(
          `
        <div class="container-fluid">
            <div class="row g-3">
                <div class="col-12 col-md-4 ps-0">
                    <img src="${movie.Poster}" class="img-fluid w-100" />
                </div>
                <div class=" col-12 col-md-8 ps-0">
                    <ul class="list-group">
                        <li class="list-group-item bg-transparent border-0 ps-0 ps-lg-3" style="color: #fff"><strong>Release : </strong>${movie.Released}</li>
                        <li class="list-group-item bg-transparent border-0 ps-0 ps-lg-3" style="color: #fff"><strong>Genre : </strong>${movie.Genre}</li>
                        <li class="list-group-item bg-transparent border-0 ps-0 ps-lg-3" style="color: #fff"><strong>Directors : </strong>${movie.Director}</li>
                        <li class="list-group-item bg-transparent border-0 ps-0 ps-lg-3" style="color: #fff"><strong>Actors : </strong>${movie.Actors}</li>
                    </ul>
                </div>
            </div>
        </div>`
        );
      }
    },
  });
});

$("#MovieList").on("click", ".stream", function () {
  let imdbID = $(this).data("stream");
  window.open("https://fembed.ro/embed/" + imdbID);
});

const resizeFunc = () => {
  if (window.innerWidth <= 768) {
    let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>`;
    $("nav .navbar-brand").addClass("w-25");
    $("nav .d-flex").addClass("w-60");
    $("#btnMovie").html(icon);
  } else {
    $("nav .navbar-brand").removeClass("w-25");
    $("nav .d-flex").removeClass("w-60");
    $("#btnMovie").html("Search");
  }
};
resizeFunc();
window.addEventListener("resize", resizeFunc);
