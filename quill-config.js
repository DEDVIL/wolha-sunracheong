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



    // Quill 툴바 가져오기

    const toolbar =

        quill.getModule("toolbar");



    // 색상 팔레트 가져오기

    const colorPicker =

        toolbar.container.querySelector(

            ".ql-color-picker .ql-picker-options"

        );



    // 커스텀 색상 7개

    const customColors = [

        // 금색 계열
        "#C9A45C",
        "#E0C27A",

        // 옥색 계열
        "#8FB9A8",
        "#6F9F91",

        // 짙은 옥색
        "#4F7F78",

        // 청회색
        "#536B7A",

        // 먹색
        "#4A4A46"

    ];



    if(colorPicker){


        customColors.forEach(

            (color) => {


                const customColor =

                    document.createElement(

                        "span"

                    );


                customColor.className =

                    "ql-picker-item";


                customColor.setAttribute(

                    "data-value",

                    color

                );


                customColor.setAttribute(

                    "title",

                    color

                );


                customColor.style.backgroundColor =

                    color;



                customColor.addEventListener(

                    "mousedown",

                    (event) => {


                        event.preventDefault();


                        const range =

                            quill.getSelection();


                        if(range){


                            quill.formatText(

                                range.index,

                                range.length,

                                "color",

                                color

                            );


                        }


                    }

                );


                colorPicker.appendChild(

                    customColor

                );


            }

        );


    }



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
