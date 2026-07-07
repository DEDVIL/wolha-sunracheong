// 월하순라청 내부 전산망
// Firebase Authentication 처리


import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// 로그인 함수

const login = async (email, password) => {

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user = userCredential.user;


        console.log(
            "접속 승인:",
            user.uid
        );


        // 사용자 프로필 확인

        const userDoc =
            await getDoc(
                doc(
                    db,
                    "users",
                    user.uid
                )
            );


        if(userDoc.exists()){

            // 기존 사용자

            window.location.href =
            "./pages/home.html";


        } else {

            // 최초 접속 사용자

            window.location.href =
            "./pages/profile-create.html";

        }


    } catch(error){

        console.error(error);


        alert(
            "접속 정보가 올바르지 않습니다."
        );

    }

};



// 로그인 버튼에서 사용할 수 있도록 연결

export {
    login
};



// 이미 로그인된 사용자 확인

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
