// 월하순라청 내부 전산망
// Page Access Guard


import {

    auth

}

from "./firebase.js";


import {

    onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





const requireLogin = ()=>{


    onAuthStateChanged(

        auth,


        (user)=>{


            if(!user){


                alert(

                "승인된 사용자만 접근 가능합니다."

                );


                location.href = "../index.html";


                return;


            }



            console.log(

            "접속 승인",

            user.uid

            );


        }


    );


};



export {

    requireLogin

};
