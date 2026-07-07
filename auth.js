// 월하순라청 내부 전산망
// Firebase Authentication


import {

    auth,

    db

}

from "./firebase.js";



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





// 로그인


const login = async (

    email,

    password

)=>{


    console.log(

    "로그인 시도"

    );



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

        "접속 승인",

        user.uid

        );





        const userDoc =


        await getDoc(


            doc(

                db,

                "users",

                user.uid

            )


        );






        // 신규 사용자


        if(
            !userDoc.exists()
        ){


            location.href =

            "./pages/profile-create.html";


            return;


        }






        const userData =

        userDoc.data();







        // 관리자


        if(

            userData.role === "admin"

        ){


            location.href =

            "./pages/admin.html";


            return;


        }





        // 일반 멤버


        if(

            userData.role === "member"

        ){


            location.href =

            "./pages/home.html";


            return;


        }




        alert(

        "접근 권한을 확인할 수 없습니다."

        );





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






// 로그인 상태 확인


onAuthStateChanged(

auth,


(user)=>{


    if(user){


        console.log(

        "현재 접속자",

        user.uid

        );


    }


}

);
