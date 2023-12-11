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

    record = [
        {"code":"seojihye",
        "title":"그대들은 어떻게 살 것인가",
        "score":5,
        "date":"2023.01.01",
        "mood":"신기한 무서운 불행한",
        "tag":"영화",
        // 퍼센트단위 ㄱㄱ
        "progress":"80",
        "detailReview":"첨엔 뭔 말인지 몰랐삼 ㅋㅋ.그냥 지브리를 영화관에서 보는 의미에서 좋았을 뿐...",
        "oneLineReview":"정말정말 재미가 있었다."
        }
    ]

}