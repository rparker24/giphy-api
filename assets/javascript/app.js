var comedians = ['louis CK', 'chris rock', 'stephen colbert', 'sarah silverman', 'george carlin', 'lewis black'];

function renderButtons(){ 
    $('#comediansView').empty();
    for (var i = 0; i < comedians.length; i++){
        var a = $('<button>')
        a.addClass('comedy').attr('data-name', comedians[i]).text(comedians[i]);
        // a.attr('data-name', comedians[i]);
        // a.text(comedians[i]);
        $('#comediansView').append(a);
    }
};

$(document).ready(function(){
    renderButtons();
});

$('#addComedian').on('click', function(){

    var comedy = $('#comedy-input').val().trim();
    comedians.push(comedy);
    renderButtons();
    return false;
});

$(document).on('click', '.comedy', function(){
    $('#gifSpace').empty();
    var comedy = this.getAttribute('data-name').replace(" ", "+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedy + "&limit=10&api_key=dc6zaTOxFJmzC";
    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
        console.log(response);
        var gifs = response.data;
        for(i = 0; i < gifs.length; i++){
            var $comedyDiv = $('<div>');
            var $p = $('<p>').text("Rating: " + gifs[i].rating.toUpperCase());
            var $gifImage = $('<img class="gifImage">');
            $gifImage.attr("src", gifs[i].images.fixed_height_still.url).attr("data-still", gifs[i].images.fixed_height_still.url).attr("data-animate", gifs[i].images.fixed_height.url).attr("data-state", "still");
            // $gifImage.attr("data-still", gifs[i].images.fixed_height_still.url);
            // $gifImage.attr("data-animate", gifs[i].images.fixed_height.url);
            // $gifImage.attr("data-state", "still");
            $comedyDiv.append($p).append($gifImage);
            // $comedyDiv.append($gifImage);
            $('#gifSpace').prepend($comedyDiv);
        }
    });
});
$(document).on('click', '.gifImage', function(){
    var state = $(this).attr('data-state'); 
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate')).attr('data-state', 'animate');
        // $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still')).attr('data-state', 'still');
        // $(this).attr('data-state', 'still');
    }
});

// moved multiple methods called on same object/variable/class to the same line vs. multiple lines
// kept original code commented for reference