// 백엔드를 만들시간이 없어서 데이터 있는 것 처럼 만들기

//code들 데이터

export class Db{
    
    codes =[
        {"code":"seojihye","codePw":"seojihye"},
        {"code":"1234","codePw":"1234"},
        {"code":"sumin","codePw":"sumin1234"},
        {"code":"yuncastle","codePw":"yuncastle"},
        {"code":"jh123","codePw":"jh123"},
        {"code":"dbdb","codePw":"dbdb"},
        {"code":"gamja","codePw":"gamja"},
    ];

    user =[
        {"userId":"okcoco03",
        "userPw":"1234",
        "code":"1234 seojihye",
        "friends":"ycastle1234",
        'resume':'재미있는 JS',
        "open_ycastle1234" :"1 1 0",
        },
        {"userId":"tnals4875",
        "userPw":"tnals487",
        "code":"sumin gamja",
        "friends":"okcoco03 ycastle1234",
        'resume':'공포영화 원툴 : )',

        },
        {"userId":"ycastle1234",
        "userPw":"ycastle",
        "code":"yuncastle",
        "friends":"tnals4875 okcoco03",
        'resume':'곧 크리스마스 !!',
        },

    ]

    tags = [
        {"tag": "영화"},
        {"tag": "드라마"},
        {"tag": "책"},
    ]
    
    
    record = [
        {"code":"seojihye",
        "title":"도라에몽 스탠바이미",
        "date":"2023.01.01",
        "tag":"영화",
        "image":"./poster/도라에몽_스탠바이미.webp",
        "oneLineReview":""
        },

        {"code":"seojihye",
        "title":"트루먼쇼",
        "date":"2023.04.29",
        "tag":"영화",
        "image":"./poster/트루먼쇼.jpg",
        "oneLineReview":"HOW'S IT GOING TO END?"
        },
        
        {"code":"seojihye",
        "title":"벼랑 위의 포뇨",
        "date":"2023.10.21",
        "tag":"영화",
        "image":"./poster/벼랑_위의_포뇨.jpg",
        "oneLineReview":"추억"
        },
    
        {"code":"seojihye",
        "title":"그대들은 어떻게 살 것인가",
        "image":"./poster/그대들은_어떻게_살_것인가_포스터.jpg",
        "score":5,
        "date":"2023.10.25",
        "mood":"신기한 무서운 불행한",
        "tag":"영화",
        // 퍼센트단위 ㄱㄱ
        "progress":"80",
        "detailReview":"첨엔 뭔 말인지 몰랐삼 ㅋㅋ.그냥 지브리를 영화관에서 보는 의미에서 좋았을 뿐...",
        "oneLineReview":"가야 할 곳은 미래이므로."
        },

        {"code":"seojihye",
        "title":"프레디의 피자가게",
        "date":"2023.11.15",
        "tag":"영화",
        "image":"./poster/freddy.webp",
        "oneLineReview":""
        },
        
    ]

}