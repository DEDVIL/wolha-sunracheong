// ======================
// 월하순라청 BGM SYSTEM v2
// ======================


const BGM_ID = "W5qqmM-ZleA";


let player = null;


let isReady = false;


let isPlaying =
localStorage.getItem("wolha-bgm-status") === "on";


let lastTime =
Number(
localStorage.getItem("wolha-bgm-time")
)
|| 0;



// ======================
// 버튼 생성
// ======================


const bgmButton =
document.createElement("button");


bgmButton.id =
"bgm-button";


bgmButton.innerHTML =
isPlaying
?
"🔇 BGM OFF"
:
"🎵 BGM ON";


document.body.appendChild(
bgmButton
);





// ======================
// YouTube API 불러오기
// ======================


const tag =
document.createElement("script");


tag.src =
"https://www.youtube.com/iframe_api";


document.head.appendChild(
tag
);




// ======================
// 플레이어 생성
// ======================


window.onYouTubeIframeAPIReady =
function(){


const iframe =
document.createElement("div");


iframe.id =
"youtube-bgm-player";


iframe.style.position =
"fixed";


iframe.style.width =
"1px";


iframe.style.height =
"1px";


iframe.style.opacity =
"0";


document.body.appendChild(
iframe
);



player =
new YT.Player(

"youtube-bgm-player",

{


videoId:
BGM_ID,


playerVars:{


autoplay:0,


controls:0,


loop:1,


playlist:BGM_ID


},



events:{


onReady:function(){


isReady =
true;



// 이전 위치 이동

if(lastTime > 0){

setTimeout(()=>{

player.seekTo(
lastTime,
true
);

},1000);

}


// 자동 재생 시도

if(isPlaying){

setTimeout(()=>{

tryPlay();

},1500);

}

},



onStateChange:function(event){


if(
event.data === YT.PlayerState.PLAYING
){

saveTime();


}


}


}


}

);


};




// ======================
// 자동 재생
// ======================


function tryPlay(){


if(!player)
return;


player.playVideo();


}

function saveTime(){

if(!player)
return;


const time =
player.getCurrentTime();


if(time){

localStorage.setItem(
"wolha-bgm-time",
Math.floor(time)
);

}

}



// ======================
// 시간 저장
// ======================


setInterval(()=>{


if(
player
&&
isPlaying
&&
isReady
){


const time =
player.getCurrentTime();



if(time){

localStorage.setItem(
"wolha-bgm-time",
Math.floor(time)
);

}


}


},5000);




// ======================
// 버튼
// ======================


bgmButton.onclick =
function(){


if(!player)
return;



if(isPlaying){


localStorage.setItem(
"wolha-bgm-time",
Math.floor(
player.getCurrentTime()
)
);


player.pauseVideo();


isPlaying =
false;


localStorage.setItem(
"wolha-bgm-status",
"off"
);


bgmButton.innerHTML =
"🎵 BGM ON";


}


else{


const savedTime =
Number(
localStorage.getItem("wolha-bgm-time")
)
|| 0;


if(savedTime > 0){

player.seekTo(
savedTime,
true
);


setTimeout(()=>{

player.playVideo();

},1000);


}
else{


player.playVideo();


}


isPlaying =
true;


localStorage.setItem(
"wolha-bgm-status",
"on"
);


bgmButton.innerHTML =
"🔇 BGM OFF";


}


};
