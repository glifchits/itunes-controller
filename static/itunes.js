songData = {}

var songInfo = function() {
    $('.nowplaying .artist').text(songData.artist);
    $('.nowplaying .song').text(songData.name);
    $('.nowplaying .album').text(songData.album);

    var i = 0;
    $('.songstate .rating .star').each(function() {
        if (i < songData.rating / 20)
            $(this).removeClass('no-star')
        else
            $(this).addClass('no-star')
        i++;
    });
}

var refreshSongInfo = function() {
    $.getJSON('/get_song', function(data) {
        console.log('get: song info', data)
        songData = data;
        songInfo();
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
        }, function() {
            refreshSongInfo();
        });
    });
}
$(function() {
    refreshSongInfo();
    
    $('.nowplaying').click(function() {
        console.debug('refreshing song info');
        refreshSongInfo();
    })
    $('.toggle a').click(function() {
        console.debug('play/pause song');
        $.post('/toggle');
        refreshSongInfo();
    })
    $('.prev a').click(function() {
        console.debug('prev song');
        $.post('/prev');
        refreshSongInfo();
    })
    $('.next a').click(function() {
        console.debug('next song');
        $.post('/next');
        refreshSongInfo();
    })
    $('.rating').hover(function() {
        setRating(this);
        songInfo();
    })
});
