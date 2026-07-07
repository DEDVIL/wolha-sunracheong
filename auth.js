// 월하순라청 내부 전산망
// Firebase Authentication 처리


import { auth, db } from "./firebase.js";


import {
    signInWithEmailAndPassword,
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



// 로그인 함수

const login = async (email, password) => {

    console.log("로그인 시도");


    try {


        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
        userCredential.user;



        console.log(
            "접속 승인:",
            user.uid
        );



        // Firestore 사용자 정보 확인

        const userDoc =
        await getDoc(

            doc(
                db,
                "users",
                user.uid
            )

        );



        // 최초 접속자

        if(!userDoc.exists()){


            window.location.href =
            "./pages/profile-create.html";


            return;

        }



        const userData =
        userDoc.data();



        console.log(
            "사용자 권한:",
            userData.role
        );



        // 관리자

        if(userData.role === "admin"){


            window.location.href =
            "./pages/admin.html";


            return;

        }



        // 일반 멤버

        window.location.href =
        "./pages/home.html";



    }


    catch(error){


        console.error(error);


        alert(
        "접속 정보가 올바르지 않습니다."
        );


    }


};




export {

    login

};




// 현재 로그인 상태 확인

onAuthStateChanged(

    auth,

    (user)=>{


        if(user){


            console.log(

            "현재 접속자:",

            user.uid

            );


        }


    }

);
