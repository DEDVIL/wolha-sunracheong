// ======================
// 월하순라청 BGM SYSTEM
// ======================


// ======================
// 기본 설정
// ======================


const BGM_ID =
"W5qqmM-ZleA";


const STATUS_KEY =
"wolha-bgm-status";


const TIME_KEY =
"wolha-bgm-time";





// ======================
// 상태
// ======================


let player =
null;


let isReady =
false;


let isPlaying =
localStorage.getItem(
STATUS_KEY
)
===
"on";





let lastTime =
Number(
localStorage.getItem(
TIME_KEY
)
)
||
0;





// ======================
// BGM 버튼 생성
// ======================


const bgmButton =
document.createElement(
"button"
);


bgmButton.id =
"bgm-button";


bgmButton.textContent =
isPlaying
?
"🔇 BGM OFF"
:
"🎵 BGM ON";





// ======================
// BGM 버튼 위치 이동
// ======================


function moveBgmButton(){


const mobileBgmArea =
document.getElementById(
"mobile-bgm-area"
);


if(
!mobileBgmArea
){

return;

}





// 모바일

if(

window.innerWidth <= 700

){


if(

bgmButton.parentElement !==
mobileBgmArea

){


mobileBgmArea.appendChild(
bgmButton
);


}


}





// PC

else{


if(

bgmButton.parentElement !==
document.body

){


document.body.appendChild(
bgmButton
);


}


}


}





// 버튼을 일단 body에 넣기

document.body.appendChild(
bgmButton
);


// 현재 화면 크기에 맞게 이동

moveBgmButton();


// 화면 크기 변경 시 이동

window.addEventListener(
"resize",
moveBgmButton
);





// ======================
// YouTube API 불러오기
// ======================


const youtubeScript =
document.createElement(
"script"
);


youtubeScript.src =
"https://www.youtube.com/iframe_api";


document.head.appendChild(
youtubeScript
);





// ======================
// YouTube 플레이어 생성
// ======================


window.onYouTubeIframeAPIReady =
function(){


const playerContainer =
document.createElement(
"div"
);


playerContainer.id =
"youtube-bgm-player";


playerContainer.style.position =
"fixed";


playerContainer.style.width =
"1px";


playerContainer.style.height =
"1px";


playerContainer.style.opacity =
"0";


playerContainer.style.pointerEvents =
"none";


document.body.appendChild(
playerContainer
);





player =
new YT.Player(

"youtube-bgm-player",

{


videoId:
BGM_ID,


playerVars:{


autoplay:
0,


controls:
0,


loop:
1,


playlist:
BGM_ID


},


events:{


onReady:
function(){


isReady =
true;


// 이전 재생 위치 복원

if(
lastTime > 0
){


player.seekTo(
lastTime,
true
);


}


// 이전에 BGM이 켜져 있었다면 재생 시도

if(
isPlaying
){


tryPlay();


}


},


onStateChange:
function(event){


if(

event.data ===
YT.PlayerState.PLAYING

){


isPlaying =
true;


updateButton();


}


if(

event.data ===
YT.PlayerState.PAUSED

){


saveTime();


}


}


}


}

);


};





// ======================
// 재생
// ======================


function tryPlay(){


if(

!player
||
!isReady

){


return;


}


player.playVideo();


}





// ======================
// 시간 저장
// ======================


function saveTime(){


if(

!player
||
!isReady

){


return;


}


const time =
Math.floor(
player.getCurrentTime()
);


if(
time > 0
){


localStorage.setItem(
TIME_KEY,
time
);


}


}





// ======================
// 버튼 상태 변경
// ======================


function updateButton(){


if(
!bgmButton
){


return;


}


bgmButton.textContent =
isPlaying
?
"🔇 BGM OFF"
:
"🎵 BGM ON";


}





// ======================
// 주기적으로 재생 위치 저장
// ======================


setInterval(

function(){


if(

isPlaying
&&
isReady

){


saveTime();


}


},

3000

);





// ======================
// BGM 버튼
// ======================


bgmButton.onclick =
function(){


if(

!player
||
!isReady

){


return;


}





// BGM 끄기

if(

isPlaying

){


saveTime();


player.pauseVideo();


isPlaying =
false;


localStorage.setItem(
STATUS_KEY,
"off"
);


updateButton();


return;


}





// BGM 켜기

const savedTime =
Number(

localStorage.getItem(
TIME_KEY
)

)
||
0;


if(
savedTime > 0
){


player.seekTo(
savedTime,
true
);


}


player.playVideo();


isPlaying =
true;


localStorage.setItem(
STATUS_KEY,
"on"
);


updateButton();


};
