// nav 불러오기
import { Db } from './db.js';

class Login {
    constructor() {
        /* 자주쓰는 변수 저장*/

        /* db불러오기*/
        this.db = new Db();

        this.dataTrue = false;

        /*함수*/
        this.exportLoginInfo();

    }


    /*          내보내기 함수 사용 전, 유효성 검사          */
    isTure(){

        //  유효성 검사 전, 에러 알람 메시지 초기화( 여러번 도전시 초기화해야 잘못뜨지않음 )
        const errorBox = document.querySelectorAll(".errorMsg");
        errorBox.forEach((e)=>{
            e.innerHTML="";
        })
        //사용자 입력 값 변수에 저장
        const inputId = document.querySelector('.info.id input').value;
        const inputPw = document.querySelector('.info.pw input').value;
        const inputCode = document.querySelector('.info.code input').value;
        //id pw code 유효성 변수
        let trueId = false;
        let truePw = false;
        let trueCode = false;
        // ID 유효성 검사
        const user = this.db.user.find((person) => person.userId === inputId);

        if (user) {
            trueId = true;

            // PW 유효성 검사
            if (user.userPw === inputPw) {
                truePw = true;
            } else {
                this.showError("Pw"); // 비밀번호 오류 났다 표시
                return 0;
            }

            // code 유효성 검사
            const userCodes = user.code.split(" ");
            userCodes.forEach((check) => {
                if (check == inputCode) {
                    trueCode = true;
                    return 0;
                }
            });
        } else {
            this.showError("Id"); // ID에 해당하는 사용자를 찾지 못했을 때 오류 표시
            return 0;
        }

        // 모든 게 true이면 true return
        if (trueCode == true && trueId == true && truePw == true) {
            this.dataTrue = true;
        }
        if (trueId != true) {
            this.showError("Id");
        } else if (truePw != true) {
            this.showError("Pw");
        } else if (trueCode != true) {
            this.showError("code");
        }

    }

    /*                  내보내기용 함수(a태그의 html로 value전달됨)                 */
    exportLoginInfo(){

    const id = document.querySelector('.info.id input').value;
    const pw = document.querySelector('.info.pw input').value;
    const code = document.querySelector('.info.code input').value;
    
    const datas ={
        id:id,
        pw:pw,
        code:code,
    }

    const aTag = document.querySelector('a');
    aTag.addEventListener('click',(check)=>{
        this.isTure();
        if(this.dataTrue == true){
            localStorage.setItem("userInfo",JSON.stringify(datas));
        }else{
            check.preventDefault();
        }
    });

    }

    /*          유효하지 않은 정보 표시용           */
    showError(errorName){
        if (errorName=="Id"){
            const errorBox = document.querySelector(".infoId");
            errorBox.innerHTML = "! 유효한 Id가 없습니다.";
        }
        if (errorName=="Pw"){
            const errorBox = document.querySelector(".infoPw");
            errorBox.innerHTML = "! Pw가 틀렸습니다.";
        }
        if (errorName=="code"){
            const errorBox = document.querySelector(".infoCode");
            errorBox.innerHTML = "! 유효한 Code가 없습니다.";
        }
    }
}

// 필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () => {
    new Login();
};
