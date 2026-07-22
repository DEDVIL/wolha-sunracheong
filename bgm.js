// ======================
// 월하순라청 공통 BGM
// ======================

const YOUTUBE_VIDEO_ID =
"W5qqmM-ZleA";


// ======================
// BGM 상태
// ======================

let bgmEnabled =
localStorage.getItem("wolha-bgm") === "on";


// ======================
// YouTube 플레이어 생성
// ======================

const bgmFrame =
document.createElement("iframe");


bgmFrame.src =
`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}`;


bgmFrame.allow =
"autoplay";


bgmFrame.style.position =
"fixed";


bgmFrame.style.width =
"1px";


bgmFrame.style.height =
"1px";


bgmFrame.style.opacity =
"0";


bgmFrame.style.pointerEvents =
"none";


bgmFrame.style.left =
"-10px";


bgmFrame.style.bottom =
"-10px";


document.body.appendChild(
bgmFrame
);


// ======================
// BGM 버튼 생성
// ======================

const bgmButton =
document.createElement("button");


bgmButton.id =
"bgm-toggle-button";


bgmButton.textContent =
bgmEnabled
? "BGM ON"
: "BGM OFF";


document.body.appendChild(
bgmButton
);


// ======================
// YouTube 명령
// ======================

function sendYouTubeCommand(
command
){

    bgmFrame.contentWindow.postMessage(

        JSON.stringify({

            event:
            "command",

            func:
            command,

            args:
            []

        }),

        "*"

    );

}


// ======================
// 버튼 클릭
// ======================

bgmButton.addEventListener(

"click",

()=>{


    if(bgmEnabled){

        sendYouTubeCommand(
            "pauseVideo"
        );


        bgmEnabled =
        false;


        localStorage.setItem(
            "wolha-bgm",
            "off"
        );


        bgmButton.textContent =
        "BGM OFF";


    }

    else{

        sendYouTubeCommand(
            "playVideo"
        );


        bgmEnabled =
        true;


        localStorage.setItem(
            "wolha-bgm",
            "on"
        );


        bgmButton.textContent =
        "BGM ON";

    }

}

);
