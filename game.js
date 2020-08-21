$(document).height($("body").height * 0.8);
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var turn = 0;

$(document).on("keydown",function(){
  if(!started){
    $("#level-title").text("Level " + level);
    if(turn > 0){
      $("body").removeClass("game-over");
    }
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
});

function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function checkAnswer(currentLevel){
  var check = currentLevel - 1;
  if(userClickedPattern[check] !== gamePattern[check]){
    playSound("wrong");
    setTimeout(function(){
      $("body").addClass("game-over");
      turn++;
      $("h1").text("Game Over, Press Any Key to Restart.");
      for(var i = 0; i < 5; i++){
        $("h1").fadeOut(100).fadeIn(100);
      }
    },200);
    userClickedPattern = [];
    startOver();
  }
  if(currentLevel == gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
    userClickedPattern = [];
  }
}
function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
