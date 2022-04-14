var userClickedPattern = [];

var gamePatterns = [];

var buttonColors = ["red", "blue", "green", "yellow"];


function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColor = buttonColors[randomNumber];
    gamePatterns.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

 }


function playSound(name){

    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

function animatePress(currentColor){

    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);

}

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length)

});


var started = false;

var level = 0;

$(document).keypress(function (){
if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}

});

function checkAnswer(currentLevel){
  
    if(gamePatterns[currentLevel-1] === userClickedPattern[currentLevel-1]){
        
        if (userClickedPattern.length === gamePatterns.length){

            
            setTimeout(function(){
                nextSequence()
        }, 1000);
    
          }
    
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        startOver()
    }

}


function startOver(){
    gamePatterns = [];
    level = 0;
    started = false;
}