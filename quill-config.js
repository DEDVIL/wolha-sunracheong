// js/quill-config.js


const Size = Quill.import("attributors/class/size");


Size.whitelist = [

    "10px",
    "12px",
    "18px",
    "24px",
    "32px"

];


Quill.register(Size, true);




export function createQuill(selector){


    const quill = new Quill(

        selector,

        {


            theme:"snow",


            modules:{


                toolbar:{


                    container:[


                        // 글자 크기
                        [
                            {
                                size:[
                                    "10px",
                                    "12px",
                                    false,
                                    "18px",
                                    "24px",
                                    "32px"
                                ]
                            }
                        ],



                        // 굵게 / 기울임 / 밑줄 / 취소선
                        [
                            "bold",
                            "italic",
                            "underline",
                            "strike"
                        ],



                        // 색상
                        [
                            {
                                color:[]
                            },

                            {
                                background:[]
                            }
                        ],



                        // 정렬
                        [
                            {
                                align:[]
                            }
                        ],



                        // 목록
                        [

                            {
                                list:"ordered"
                            },

                            {
                                list:"bullet"
                            }

                        ],



                        // 인용문
                        [
                            "blockquote"
                        ],



                        // 링크 / 이미지
                        [
                            "link",
                            "image"
                        ],



                        // 서식 제거
                        [
                            "clean"
                        ]


                    ],




                    handlers:{



                        image:function(){



                            const url = prompt(

                                "이미지 URL을 입력해주세요."

                            );



                            if(url){



                                const range =

                                this.quill.getSelection();



                                this.quill.insertEmbed(

                                    range.index,

                                    "image",

                                    url

                                );


                            }


                        }


                    }


                }


            }


        }


    );



    return quill;


}
