/*
* Arcade game class
*
*
*
* */


$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            moveX('main', 'l');
            break;

        case 38: // up
            moveX('main', 'u');
            break;

        case 39: // right
            moveX('main', 'r');
            break;

        case 40: // down
            moveX('main', 'd');
            break;

        case 32: // down
            actionX('fire', 'main');
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


function consol(text){

    if (window.console) console.log(text);

}

function moveX(id, direction){

    lft = parseInt($('#' + id).css('left'));
    tp = parseInt($('#' + id).css('top'));


    switch(direction) {
        case 'l':
            lft = lft - 5;
            $('#' + id).css('left', lft + 'px');
            break;

        case 'u':
            tp = tp - 5;
            $('#' + id).css('top', tp + 'px');
            break;

        case 'r':
            lft = lft + 5;
            $('#' + id).css('left', lft + 'px');
            break;

        case 'd':
            tp = tp + 5;
            $('#' + id).css('top', tp + 'px');
            break;
 // exit this handler for other keys
    }

    x = Array();
    x['x'] = lft;
    x['y'] = tp;

    return x;
}


function actionX(cd, did){

    switch(cd) {
        case 'fire':
            fireX(100, 100, did);
            break;

        default: return; // exit this handler for other keys
    }

}


function fireX(x, y, did){


    lft = parseInt($('#' + did).css('left'));
    tp = parseInt($('#' + did).css('top')) + 40;

    wd = parseInt(parseInt($('#' + did).css('width'))/2);
    hg = parseInt(parseInt($('#' + did).css('height')/2));


    id = createX('cqw', 25, 25, (lft+wd), (tp-10));

    $('#' + id).animate({left: "-30px"}, 3000, function(){  $('#' + id).remove()  });

//    for(i=0;i<200;i++){setTimeout( function(){ moveX(id, 'u'); }, 500); }

    consol(id);

}


function createX(type, wdt, hgt, posX, posY){


    data = $('body').html();
    id = Math.floor((Math.random() * 10000) + 1);
    c = '<div id="'+id+'" class="'+type+'" style="display:block; position:absolute; width:'+wdt+'px; height:'+hgt+'px; left:'+posX+'px; top:'+posY+'px;" href="http://mediaart.lt"></div>';

    $('body').append(c); //.html(c + data);

    return id;

}