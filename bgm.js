// ======================
// 월하순라청 BGM SYSTEM
// ======================


// YouTube 영상 ID
const BGM_ID =
"W5qqmM-ZleA";


// 현재 상태 저장
let isPlaying =
localStorage.getItem("wolha-bgm") === "on";



// ======================
// YouTube iframe 생성
// ======================

const iframe =
document.createElement("iframe");


iframe.src =
`https://www.youtube.com/embed/${BGM_ID}?enablejsapi=1&loop=1&playlist=${BGM_ID}`;


iframe.allow =
"autoplay";


iframe.style.position =
"fixed";

iframe.style.width =
"1px";

iframe.style.height =
"1px";

iframe.style.opacity =
"0";

iframe.style.pointerEvents =
"none";


document.body.appendChild(
iframe
);




// ======================
// 버튼 생성
// ======================

const button =
document.createElement("button");


button.id =
"bgm-button";


button.innerHTML =
isPlaying
? "🔇 BGM OFF"
: "🎵 BGM ON";


document.body.appendChild(
button
);





// ======================
// YouTube 명령 보내기
// ======================

function controlBGM(command){

iframe.contentWindow.postMessage(

JSON.stringify({

event:"command",

func:command,

args:[]

}),

"*"

);

}





// ======================
// 버튼 클릭
// ======================

button.addEventListener(

"click",

()=>{


if(isPlaying){


controlBGM(
"pauseVideo"
);


isPlaying =
false;


localStorage.setItem(
"wolha-bgm",
"off"
);



button.innerHTML =
"🎵 BGM ON";



}

else{


controlBGM(
"playVideo"
);



isPlaying =
true;


localStorage.setItem(
"wolha-bgm",
"on"
);



button.innerHTML =
"🔇 BGM OFF";


}


}

);
