var buttonColours=["red", "blue", "green", "yellow"];
var gamepattern=[];
var userClickedPattern = [];

var started=false;
var level=0;
var nam=prompt("Enter your Name");
$("#name").text("HI "+nam);

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamepattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamepattern.length===userClickedPattern.length){
      setTimeout(function(){nextSequence();},1000);
    }
  }
  else{
   playSound("wrong");
   $("body").addClass("game-over");
   $("#name").text("sorry "+nam);
   $("#level-title").text("Game Over, Press Any Key to Restart");
   setTimeout(function(){$("body").removeClass("game-over");}, 200);
   startOver();
 }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+level);
  var randomnumber= Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomnumber];
  gamepattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}
function playSound(name){
  new Audio("sounds/"+name+".mp3").play();
}
function startOver(){
  level=0;
  gamepattern=[];
  started=false;
}
