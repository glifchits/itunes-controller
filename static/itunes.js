var songInfo = function() {
    $.getJSON('/get_song', function(data) {
        console.debug(data)
        $('.nowplaying .artist').text(data.artist);
        $('.nowplaying .song').text(data.name);
        $('.nowplaying .album').text(data.album);

        var i = 0;
        $('.songstate .rating .star').each(function() {
            if (i < data.rating / 20)
                $(this).removeClass('no-star')
            else
                $(this).addClass('no-star')
            i++;
        });
    });
}
var setRating = function(obj) {
    var ch = $(obj).children('.star');
    $('.rating .star').hover(function() {
        var idx = $(ch).index(this);
        var i = 0;
        $(ch).each(function() {
            if (i <= idx)
                $(this).removeClass('no-star')
            else
                $(this).addClass('no-star')
            i++;
        });
    });
    $('.rating .star').unbind('click').click(function() {
        var idx = $(ch).index(this) + 1;
        console.debug('star', idx, 'was clicked');
        $.post('/set_rating', {
            'rating' : idx * 20
        });
    });
}
$(function() {
    songInfo();
    $('.nowplaying').click(function() {
        console.debug('refreshing song info');
        songInfo();
    })
    $('.toggle a').click(function() {
        console.debug('play/pause song');
        $.post('/toggle');
        songInfo();
    })
    $('.prev a').click(function() {
        console.debug('prev song');
        $.post('/prev');
        songInfo();
    })
    $('.next a').click(function() {
        console.debug('next song');
        $.post('/next');
        songInfo();
    })
    $('.rating').hover(function() {
        setRating(this);
        songInfo();
    })
});
