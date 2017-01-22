// Global Variables
var aText = new Array(
"We’ll go back in time so you can have another go.",
"This time see if you can help Sam make a better first impression.",
"Click 'Next' to continue. Good luck!"
);
var iSpeed = 50; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

var newHTML = "<div class='middle-right' style='background-color: #666666'><h2>FEEDBACK ON YOUR CHOICE</h2><img class='mid-right-warning' src='icon1.png'><button style='margin-top: 117px; margin-left: -167px;' ONCLICK='Listen(this);' id=audio>LISTEN</button><p class='mid-left-top-text'>You chose a body language ........... ................... ............................. ..................... .................. .................... .....................</p>"
//init Function
var card1 = document.getElementById('card1');
var card2 = document.getElementById('card2');
var card3 = document.getElementById('card3');
var intro = document.getElementById('samIntro');
var introSection = document.getElementById('intro');
var videoId = 1;
var pauseButton = document.querySelector(".pause");
var skip = document.querySelector(".skip");
var mustFlip = 1;
var currentVideo = 0;
var element;
var help = document.querySelector(".help");
var snd = new Audio("s1_f0003.mp3");
var chose = document.getElementById('chose');
var rejected = document.getElementById('rejected');
var rejected2 = document.getElementById('rejected2');
var forBlow = document.getElementById('forBlow');

var init = function() {
  document.getElementById('happened').addEventListener('ended',myHandler,false);
  if (chose) {
    this.aText = new Array(
    "I'm going to give you feedback on each decision you've just made.",
    "You can see what happened and what you chose by clicking the 'Replay' buttons. You can also see the options you rejected.",
    "Click the feedback panel to hear my pearls of wisdom.",
    "Click 'Next' to continue."
    );
    chose.addEventListener('ended',myHandler,false);
    rejected.addEventListener('ended',myHandler,false);
    rejected2.addEventListener('ended',myHandler,false);
    forBlow.addEventListener( 'click', function(){
      card3.classList.remove('flipped');
      setTimeout(flip,352);
    }, false);
  }

  function myHandler(e) {
      this.parentElement.getElementsByTagName("button")[0].innerHTML = "REPLAY"
  }

  $('ul.tabs li').click(function(){
  		var tab_id = $(this).attr('data-tab');
  		$('ul.tabs li').removeClass('current');
  		$('.tab-content').removeClass('current');

  		$(this).addClass('current');
  		$("#"+tab_id).addClass('current');
  	})

  typewriter();
};
//typewriter function
function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");

 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br /><br />';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriter()", 300);
  }
 } else {
  setTimeout("typewriter()", iSpeed);
  destination.scrollTop = destination.scrollHeight;
 }
}
//onLoad function
window.addEventListener('DOMContentLoaded', init, false);
function bigImg(x) {
  x.src = "btn_feedback_over.png";
}

function flip() {
  document.getElementById("blow").innerHTML = newHTML;
}

function normalImg(x) {
    x.src = "btn_feedback_up.png";
}

function flipper2() {
  card2.classList.add('flipped');
  setTimeout(flipper3, 1000);
}

function flipper3() {
  if(mustFlip) {
    card3.classList.add('flipped');
    mustFlip = 0;
  }
}
// audio
function Listen(item) {
  if (snd.paused) {
    snd.play();
    item.innerHTML = "PAUSE";
    snd.currentTime = 0;
    pauseButton.innerHTML = "pause";
    pauseButton.style.color = "#00ff00";
    if (currentVideo !== snd && currentVideo !== 0) {
      this.currentVideo.pause();
      this.currentVideo.parentElement.getElementsByTagName("button")[0].innerHTML = "REPLAY";
      this.currentVideo.currentTime = 0;
    }
    this.currentVideo = snd;
    this.element = item;
  }
  else {
    snd.pause();
    item.innerHTML = "LISTEN";
    pauseButton.innerHTML = "play_arrow";
  }
}
snd.addEventListener('ended', function()
  {
  $('.helpText').show();
  document.getElementById('audio').innerHTML = "LISTEN";
  pauseButton.innerHTML = "play_arrow";
  })

function audio() {
  snd.pause();
  document.getElementById('audio').innerHTML = "LISTEN";
}

function next() {
  card1.classList.add('flipped');
  introSection.remove();
  setTimeout(flipper2, 1000);
  intro.pause();
  skip.remove();
  videoId = 0;
  pauseButton.innerHTML = "pause";
  pauseButton.style.color = "grey";
}

function pause() {
  if(videoId) {
    if (intro.paused) {
      intro.play();
      pauseButton.innerHTML = "pause";
    }
    else {
      intro.pause();
      pauseButton.innerHTML = "play_arrow";
    }
  }
  else if (currentVideo) {
    if (currentVideo.paused) {
      currentVideo.play();
      pauseButton.innerHTML = "pause";
      if (element.innerHTML=="LISTEN") {
        element.innerHTML = "PAUSE";
      }
      else {
        element.innerHTML = "LISTEN";
      }
    }
    else {
      currentVideo.pause();
      pauseButton.innerHTML = "play_arrow";
      if (element.innerHTML=="LISTEN") {
        element.innerHTML = "PAUSE";
      }
      else {
        element.innerHTML = "LISTEN";
      }
    }
  }
}

function paused() {
  intro.pause();
  intro.currentTime = 0;
  pauseButton.innerHTML = "play_arrow";
}

function pausered() {
  document.getElementById('happened').pause();
  document.getElementById('happened-button').innerHTML = "REPLAY";
}

function pauser(element) {
  if (currentVideo === snd) {
    currentVideo.pause();
    currentVideo.currentTime = 0;
  }
  else if (currentVideo !== element.parentElement.getElementsByTagName("video")[0] && currentVideo !== 0) {
    currentVideo.pause();
    currentVideo.parentElement.getElementsByTagName("button")[0].innerHTML = "REPLAY";
    currentVideo.currentTime = 0;
  }
  this.element = element;
  this.currentVideo = element.parentElement.getElementsByTagName("video")[0];
   if (currentVideo.paused) {
     currentVideo.play();
     pauseButton.innerHTML = "pause";
     pauseButton.style.color = "#00ff00";
   }
   else {
     currentVideo.pause();
     pauseButton.innerHTML = "play_arrow";
   }
}

function inner(y) {
  x = y.innerHTML;
  if (x=="REPLAY") {
    y.innerHTML = "PAUSE";
  }
  else {
    y.innerHTML = "REPLAY";
  }
}

if(help){
help.addEventListener("click", function() {
    $('.helpText').toggle();
});
}
