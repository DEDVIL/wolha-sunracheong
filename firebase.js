// 월하순라청 내부 전산망
// Firebase Connection


import {
    initializeApp
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getAuth
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
    getFirestore
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import {
    getStorage
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";




// Firebase 설정

const firebaseConfig = {


    apiKey:
    "AIzaSyC0akW6PIOg6T1cA_S1mCxYJYr88VjT8qY",


    authDomain:
    "wolha-sunracheong.firebaseapp.com",


    projectId:
    "wolha-sunracheong",


    storageBucket:
    "wolha-sunracheong.firebasestorage.app",


    messagingSenderId:
    "299397196745",


    appId:
    "1:299397196745:web:fd5163cdf49a727c739618"


};




// Firebase 초기화


const app =
initializeApp(firebaseConfig);




// 서비스 연결


const auth =
getAuth(app);



const db =
getFirestore(app);



const storage =
getStorage(app);




// 외부 사용

export {

    app,

    auth,

    db,

    storage

};
