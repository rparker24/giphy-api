var comedians = ['louis ck', 'chris rock', 'george carlin', 'lewis black'];
function renderButtons(){ 
    $('#comediansView').empty();
    for (var i = 0; i < comedians.length; i++){
        var a = $('<button>')
        a.addClass('comedy');
        a.attr('data-name', comedians[i]);
        a.text(comedians[i]);
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
    var comedy = this.getAttribute('data-name');
    comedy = comedy.replace(" ", "+");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comedy + "&limit=10&api_key=dc6zaTOxFJmzC";
    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
        console.log(response);
        var gifs = response.data;
        debugger;
        for(i = 0; i < gifs.length; i++){
            $('#gifSpace').append('<div>' + 'Rating: ' + gifs[i].rating.toUpperCase() + '</div>' + '<img class="gifImg" alt="comedy gif">');
            // 
            $('.gifImg').attr("src", "gifs[i].embed_url");
        }
    });
});