// 월하순라청 귀문 랜덤 생성기
// Gate Generator A안


import {
    db
}
from "../firebase.js";


import {
    collection,
    getDocs
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




// ======================
// 랜덤 선택
// ======================


function randomPick(array){

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}



// ======================
// | 데이터 랜덤 선택
// ======================


function randomPickValue(value){


    if(!value || typeof value !== "string"){

        return "-";

    }


    const list =
    value
    .split("|")
    .map(v=>v.trim())
    .filter(v=>v);


    if(list.length===0){

        return "-";

    }


    return randomPick(list);

}



// ======================
// Firestore 데이터
// ======================


async function getCollectionData(name){


    const snapshot =
    await getDocs(
        collection(
            db,
            name
        )
    );


    const data=[];


    snapshot.forEach(doc=>{


        const raw =
        doc.data();


        const clean={};


        Object.keys(raw).forEach(key=>{

            clean[key.trim()] =
            raw[key];

        });



        data.push({

            id:doc.id,

            ...clean

        });


    });


    return data;


}





// ======================
// 템플릿 치환
// ======================


function replaceTemplate(
    template,
    data
){


return template


.replaceAll(
"{location}",
data.location
)


.replaceAll(
"{targetName}",
data.targetName
)


.replaceAll(
"{grade}",
data.grade
)


.replaceAll(
"{relatedPhenomenon}",
data.relatedPhenomenon || "-"
)


.replaceAll(
"{dangerLevel}",
data.dangerLevel || "-"
)


.replaceAll(
"{habitat}",
data.habitat || "-"
)


.replaceAll(
"{incidentKeyword}",
data.incidentKeyword || "-"
)

.replaceAll(
"{victim}",
data.victim || "-"
)


.replaceAll(
"{symptom}",
data.symptom || "-"
);
    
}




// ======================
// 메인 생성
// ======================


export async function generateGate(){



// 1.
// 사건 템플릿 선택


const templates =
await getCollectionData(
"incidentTemplates"
);



const incident =
randomPick(
templates
);





// 2.
// 사건 유형 판단


let sourceType="yokai";



if(

incident.incidentType==="빙의 사건"

){

sourceType="evil";

}




// 3.
// 대상 DB 선택


const targetList =

await getCollectionData(

sourceType==="yokai"

?

"yokaiDB"

:

"evilDB"

);





const target =
randomPick(
targetList
);





// 4.
// 위치 선택


const locations =
await getCollectionData(
"locations"
);



const selectedLocation =
randomPick(
locations
);




const locationName =

selectedLocation.fullName

||

`${selectedLocation.city} ${selectedLocation.district} ${selectedLocation.area}`;






// 5.
// 사건 문장 선택


const templateText =

randomPick(

incident.templates
.split("|")

);


// ======================
// relatedPhenomenon fallback
// ======================

let phenomenon =
randomPickValue(target.relatedPhenomenon);


if(
    phenomenon.includes("|")
){

    phenomenon =
    randomPickValue(phenomenon);

}


if(
    phenomenon === "-"
){

    phenomenon =
    randomPick([
"원인을 확인할 수 없는 이상 반응",
"비정상적인 현장 변화",
"대상 개체와 관련된 특이 징후",
"주변 환경 변화",
"정체불명의 기이 현상"
    ]);

}
randomPickValue(
    target.relatedPhenomenon
);


if(
    phenomenon === "-"
){

    phenomenon =
    randomPick([
        "원인을 확인할 수 없는 이상 현상",
        "심야 시간대 발생한 비정상 반응",
        "대상 개체와 관련된 특이 현상",
        "주변 환경 변화와 관련된 이상 징후",
        "정체불명의 기이 현상"
    ]);

}


const content =

replaceTemplate(

templateText,

{

location:
locationName,


targetName:
target.name,


grade:
target.grade || "미상",


relatedPhenomenon:
phenomenon,


habitat:
target.habitat,


incidentKeyword:
incident.keyword,


victim:
target.victim || "-",


symptom:
target.symptom || "-"

}

);







return {


title:

`${locationName} 귀문 사건`,



location:

locationName,



grade:

target.grade || "미상",



type:

incident.incidentType,



targetName:

target.name,



originalName:

target.originalName || "",



category:

target.category || "",



content,



incidentId:

incident.id,



incidentKeyword:

incident.keyword,



sourceType,





// 요괴

appearance:

target.appearance || "",


behavior:

target.behavior || "",


habitat:

target.habitat || "",

    
// 빙의

victim:

target.victim || "",


symptom:

target.symptom || "",



// 악귀

origin:

target.origin || "",


manifestation:

target.manifestation || "",







createdAt:

new Date()


};


}
