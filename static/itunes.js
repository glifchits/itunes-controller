var songInfo = function() {
    $.getJSON('/get_song', function(data) {
        $('.nowplaying .artist').text(data.artist);
        $('.nowplaying .song').text(data.name);
        $('.nowplaying .album').text(data.album);
    });
}

var rating = function() {
    $('.rating .star').each(function() {
        if ($(this).hasClass('no-star'))
            icon = '<i class="fa fa-star-o"></i>';
        else
            icon = '<i class="fa fa-star"></i>';
        $(this).html(icon);
    })
}

$(function() {
    songInfo();
    rating();
    $('.nowplaying').click(function() {
        songInfo();
        rating();
    })
    $('.toggle a').click(function() {
        $.post('/toggle');
        songInfo();
        rating();
    })
    $('.prev a').click(function() {
        $.post('/prev');
        songInfo();
        rating();
    })
    $('.next a').click(function() {
        $.post('/next');
        songInfo();
        rating();
    })
});
