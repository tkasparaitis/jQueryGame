/*
* Arcade game class
*
*
*
* */

var step = 10;
var lock = 0;
var keys = {};
var millis = 100;

$(document).keydown(function (e) {
    keys[e.which] = true;

    actionKeys();
    e.preventDefault();
});

$(document).keyup(function (e) {
    delete keys[e.which];

    actionKeys();
    e.preventDefault();
});

function actionKeys() {

    for (var i in keys) {
        if (!keys.hasOwnProperty(i)) continue;
        oneAction(parseInt(i));
    }
}


 $( document ).ready(function() {
     loadEnemy();
});

function oneAction(key) {

    switch (key) {
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

        case 32: // fire

            if (lock == 0) {
                actionX('fire', 'main');
            }
            break;

        default:
            return; // exit this handler for other keys
    }
     // prevent the default action (scroll / move caret)
}


function loadEnemy(){

    cord = randPosition();
    enemy = new Array();
    enemy[1] = "0px 0px";
    enemy[2] = "85px 0px";
    enemy[3] = "170px 0px";
    enemy[4] = "0px 66px";
    enemy[5] = "85px 66px";
    enemy[6] = "170px 66px";
    enemy[7] = "0px 132px";
    enemy[8] = "85px 132px";
    enemy[9] = "170px 132px";
    enemynr = Math.floor((Math.random() * 9) + 1);


    createX('enemy', 85, 66, cord['x'], cord['y']);
    $('.enemy').css('background-position', enemy[enemynr]);
}

function randPosition(){

    var xy = new Array();
    xy['y'] = Math.floor((Math.random() * $(document).height()) + 1);
    xy['x'] = Math.floor((Math.random() * ($(document).width()/2)) + 1);
    return xy;
}

function moveX(id, direction){

    lft = parseInt($('#' + id).css('left'));
    tp = parseInt($('#' + id).css('top'));


    switch(direction) {
        case 'l':
            lft = lft - step;
            $('#' + id).css('left', lft + 'px');
            break;

        case 'u':
            tp = tp - step;
            $('#' + id).css('top', tp + 'px');
            break;

        case 'r':
            lft = lft + step;
            $('#' + id).css('left', lft + 'px');
            break;

        case 'd':
            tp = tp + step;
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

    lock = 1;
    lft = parseInt($('#' + did).css('left'));
    tp = parseInt($('#' + did).css('top')) + 40;

    wd = parseInt(parseInt($('#' + did).css('width'))/2);
    hg = parseInt(parseInt($('#' + did).css('height')/2));


    crid = createX('cqw', 25, 25, (lft+wd), (tp-10));

    checkEnemy('#cr' + crid);

    $('#cr' + crid).animate({left: "30px"}, 3000, 'linear', function(){



            $('#cr' + crid).remove();

        lock = 0;
    });


    consol(crid + '|' + tp);

}

function checkEnemy(id){

    if (millis == null) millis = 100;

    var kiek = 0;
    var enemypos = $('.enemy').position();

    minX = enemypos.left; maxX = minX + 85;
    minY = enemypos.top; maxY = minY + 66;


    consol("enemy: " + enemypos.left + "px " + enemypos.top+"px ("+minX+"/"+maxX+"/"+minY+"/"+maxY+"/"+")");
    setInterval(function () {
        kiek = kiek + millis;
        if(kiek > 3000) return;
        var pos = $(id).position();

        if( (pos.left >= minX) && (pos.left <= maxX) && (pos.top >= minY) && (pos.top >= minY) ){

            $('.enemy').css('backgroundSize', '100%');
            $('.enemy').css('background-position', '0px 0px');
            $('.enemy').css('backgroundImage', 'url("./img/explode.gif")');
            $(id).remove();
            $('.enemy').animate({opacity: 0}, 1000, function(){ $('.enemy').remove(); loadEnemy(); });

        }

        consol("left: " + pos.left + ", top: " + pos.top);

    }, millis);


}

function createX(type, wdt, hgt, posX, posY){


    data = $('body').html();
    id = Math.floor((Math.random() * 10000000) + 1);
    c = '<div id="cr'+id+'" class="'+type+'" style="display:block; position:absolute; width:'+wdt+'px; height:'+hgt+'px; left:'+posX+'px; top:'+posY+'px;" href="http://mediaart.lt"></div>';

    $('body').append(c); //.html(c + data);

    return id;

}






function consol(text){

    if (window.console) console.log(text);

}