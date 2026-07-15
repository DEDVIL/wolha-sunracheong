// 월하순라청 귀문 랜덤 생성기
// Gate Generator

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
// Firestore 전체 가져오기
// ======================


async function getCollectionData(name){



    const snapshot = await getDocs(

        collection(
            db,
            name
        )

    );



    const data = [];



    snapshot.forEach(doc=>{


        data.push({

            id:doc.id,

            ...doc.data()

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
    );


}










// ======================
// 메인 생성 함수
// ======================


export async function generateGate(type){



    let targetList;



    // 대상 DB 선택

    if(type === "yokai"){


        targetList =
        await getCollectionData(
            "yokaiDB"
        );


    }
    else{


        targetList =
        await getCollectionData(
            "evilDB"
        );


    }







    const locations =

    await getCollectionData(
        "locations"
    );



    const templates =

    await getCollectionData(
        "incidentTemplates"
    );









const target =

randomPick(
    targetList
);



const selectedLocation =

randomPick(
    locations
);

console.log("선택 위치", selectedLocation);





let incidentType = "";


if(type === "evil"){


    incidentType =

    randomPick(

        target.incidentType
        ?.split("|")

        ||

        ["악귀 출현"]

    );


}
else{


    incidentType = "출현";


}





let availableTemplates = templates.filter(
    t =>
    t.incidentType === "출현"
);


if(
    availableTemplates.length === 0
){

    throw new Error(
        "해당 사건 유형의 템플릿이 없습니다."
    );

}



const template = randomPick(
    availableTemplates
);

console.log("선택된 템플릿", template);







const locationName =

selectedLocation.fullName ||

`${selectedLocation.city} ${selectedLocation.district} ${selectedLocation.area}`;





const templateList =
(template.templates || "").split("|");





if(templateList.length === 0){

throw new Error(
"사건 템플릿 데이터가 없습니다."
);

}



const templateText =

randomPick(
templateList
);

console.log("선택 문장", templateText);







    const content =

    replaceTemplate(

        templateText,

        {


            location:
            locationName,


            targetName:
            target.name,


            grade:
            target.grade,


            relatedPhenomenon:
            target.relatedPhenomenon,


            dangerLevel:
            target.dangerLevel,


            habitat:
            target.habitat,


            incidentKeyword:
            target.incidentKeyword



        }

    );









    const result = {



        title:

        `${locationName} 귀문 사건`,



        location:

        locationName,



        grade:

        target.grade || "미상",



        type:

        incidentType,



        targetName:

        target.name,



        originalName:

        target.originalName || "",



        category:

        target.category || "",



        content:



        content,



        relatedPhenomenon:

        target.relatedPhenomenon || "",



        sourceType:

        type,



        createdAt:

        new Date()




    };





    return result;


}
