// 월하순라청 내부 전산망
// Page Access Guard


import {

    auth,

    db

}

from "./firebase.js";


import {

    onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

    doc,

    getDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const requireLogin = (callback)=>{


    onAuthStateChanged(

        auth,


        async (user)=>{


            if(!user){


                alert(

                "승인된 사용자만 접근 가능합니다."

                );


                location.href="../index.html";


                return;


            }




            const userDoc = await getDoc(

                doc(

                    db,

                    "users",

                    user.uid

                )

            );





            if(!userDoc.exists()){


                alert(

                "등록되지 않은 사용자입니다."

                );


                location.href="../index.html";


                return;


            }




            const userData = userDoc.data();




            if(

                !userData.role

            ){


                alert(

                "접근 권한을 확인할 수 없습니다."

                );


                location.href="../index.html";


                return;


            }




            console.log(

            "접속 승인:",

            userData.name,

            userData.role



                

            );

if(callback){

    try{

        callback(userData);

    }

    catch(error){

        console.error(
            "페이지 실행 오류:",
            error
        );

    }

}

        }


    );


};




export {

    requireLogin

};
