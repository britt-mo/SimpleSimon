/**
 * Created by brittmo on 10/31/16.
 */
var pattern = [];
var usedPattern = [];
var level = 0;
var gameCheck = false;

function addPattern() {
    var pValue = randNum(1, 4);

    pattern.push(pValue);
}


function playPattern() {

    for (var i = 0; i < pattern.length; i++) {
        var delayTime = i * 600;

        setTimeout(flashSquare, delayTime);


    }

}

function flashSquare() {

    var item = pattern.pop();
    gameCheck = true;

    // pops and removes first item of array
    $('#' + item).animate({
        opacity: 0.2
    }, 200).animate({
        opacity: 1
    }, 100);
    //animation takes 300 ms

    usedPattern.push(item);
    // take the item  removed from pattern and add it to used pattern

    if (pattern.length <= 0) {
        // add the click event once cpu is finished showing the pattern
        createClicks();
    }

} // end flashSquare()

function createClicks() {
    $('.square').click(function () {
        // check if clicked element is the right square
        var item = usedPattern.shift();

        var squareId = $(this).attr('id');

        $(this).animate({opacity: .2}, 200).animate({opacity: 1}, 100)

        // if yes remove from used pattern and add to pattern
        if (item == squareId) {
            //adds item back to pattern array
            pattern.push(item);

            if (usedPattern.length <= 0) {
                level++;
                $('#level').html('Level: ' + level);

                removeClicks();
                //user is finished clicking through the pattern successfully
                // add new square to pattern
                addPattern();

                // playPattern();
                setTimeout(playPattern, 800);
            }

        } else {
            // else game over
            gameCheck = false;
            $('h1').html('Game Over').css({
                fontSize: 40,
                marginBottom: 15,
                paddingTop: 15
            });
            $('p').html('Click to Restart');
            // clear out pattern arrays
            pattern = [];
            usedPattern = [];
        }


    }); // end .square click
} // end create click

function removeClicks() {
    //removes all events from element
    $('.square').unbind();

}


function startGame() {
    removeClicks();
    resetGame();
    addPattern();
    addPattern();
    playPattern();
}

function resetGame() {
    level = 0;

    $('#level').html('Level: ' + level);
    $('h1').html('Simon').css({
        marginBottom: 0,
        paddingTop: 0
    });
    $('p').html('Click to Start Game');
}


$('#centerCircle').click(function () {
    if (gameCheck === false) {
        startGame();
    }
});

function randNum(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}