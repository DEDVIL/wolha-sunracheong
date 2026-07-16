// 월하순라청 귀문 랜덤 생성기
// Gate Generator v2
// 생성 → 승인 → activeGates 등록 구조


import {
    db
}
from "../firebase.js";


import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp
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
// | 분리 데이터 랜덤 선택
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



    if(list.length === 0){

        return "-";

    }


    return randomPick(list);

}




// ======================
// Firestore 데이터 가져오기
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
// 문장 치환
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
// 귀문 생성
// ======================


export async function generateGate(){



// ----------------------
// 1.
// 사건 템플릿 선택
// ----------------------


const templates =
await getCollectionData(
"incidentTemplates"
);



const incident =
randomPick(
templates
);




// ----------------------
// 2.
// 대상 DB 결정
// ----------------------


let sourceType =
"yokai";



if(

incident.incidentType === "빙의 사건"

){

sourceType =
"evil";

}




// ----------------------
// 3.
// 요괴 / 악귀 선택
// ----------------------


const targetList =

await getCollectionData(

sourceType === "yokai"

?

"yokaiDB"

:

"evilDB"

);



const target =
randomPick(
targetList
);





// ----------------------
// 4.
// 빙의 대상 선택
// ----------------------


let possessionTargetData = null;



if(

sourceType === "evil"

){


const targets =

await getCollectionData(

"possessionTargets"

);



possessionTargetData =

randomPick(
targets
);


}




// ----------------------
// 5.
// 위치 선택
// ----------------------


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




// ----------------------
// 6.
// 현상 선택
// ----------------------


let phenomenon =

randomPickValue(

target.relatedPhenomenon

);



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





// ----------------------
// 7.
// 사건 문장 생성
// ----------------------


const templateText =

randomPick(

incident.templates
.split("|")

);




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

possessionTargetData

?

possessionTargetData.name

:

target.victim || "-",



symptom:

target.symptom || "-"


}

);





// ----------------------
// 결과 반환
// ----------------------


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





appearance:

target.appearance || "",



behavior:

target.behavior || "",



habitat:

target.habitat || "",




victim:

possessionTargetData

?

possessionTargetData.name

:

target.victim || "-",




symptom:

target.symptom || "-",



status:

"pending",



createdBy:

null,



createdAt:

new Date()


};



}






// ======================
// activeGates 저장
// ======================


export async function saveGate(
gate,
userData
){



const saveData = {


...gate,


status:

"active",



createdBy:{


uid:

userData.uid || "",


name:

userData.name || ""


},



createdAt:

serverTimestamp()



};





const docRef =

await addDoc(


collection(

db,

"activeGates"

),


saveData



);



return docRef.id;


}
