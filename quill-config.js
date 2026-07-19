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

const SizeStyle = Quill.import("attributors/style/size");

SizeStyle.whitelist = [
    "10px",
    "12px",
    "18px",
    "24px",
    "32px"
];

Quill.register(SizeStyle, true);


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
                                color:[

                                    // 기존 Quill 색상
                                    "#000000",
                                    "#e60000",
                                    "#ff9900",
                                    "#ffff00",
                                    "#008a00",
                                    "#0066cc",
                                    "#9933ff",

                                    "#ffffff",
                                    "#facccc",
                                    "#ffebcc",
                                    "#ffffcc",
                                    "#cce8cc",
                                    "#cce0f5",
                                    "#ebd6ff",

                                    "#bbbbbb",
                                    "#f06666",
                                    "#ffc266",
                                    "#ffff66",
                                    "#66b966",
                                    "#66a3e0",
                                    "#c285ff",

                                    "#888888",
                                    "#a10000",
                                    "#b26b00",
                                    "#b2b200",
                                    "#006100",
                                    "#0047b2",
                                    "#6b24b2",

                                    "#444444",
                                    "#5c0000",
                                    "#663d00",
                                    "#666600",
                                    "#003700",
                                    "#002966",
                                    "#3d1466",

                                    // 추가 색상
                                    "#C9A45C",
                                    "#E0C27A",
                                    "#A98245",
                                    "#8F6B3D"

                                ]
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


    let savedScrollX = 0;
    let savedScrollY = 0;


    quill.root.addEventListener(

        "paste",

        () => {


            savedScrollX = window.scrollX;

            savedScrollY = window.scrollY;


            setTimeout(

                () => {

                    window.scrollTo(

                        savedScrollX,

                        savedScrollY

                    );

                },

                0

            );


            setTimeout(

                () => {

                    window.scrollTo(

                        savedScrollX,

                        savedScrollY

                    );

                },

                100

            );


            setTimeout(

                () => {

                    window.scrollTo(

                        savedScrollX,

                        savedScrollY

                    );

                },

                300

            );


        }

    );


    return quill;


}
