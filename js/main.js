// nav 불러오기
import{ Nav } from './nav.js';
//클래스 이름은 html이름대문자
class Home{

    constructor(){
        this.navTool = new Nav();
        // home 파라미터 자리에 자기 html페이지 이름 , nav 파라미터 자리에 자기 html속 nav id넣기!!
        this.navTool.fetchingNav('main','nav');

        //2. 여기에 실행 순서대로 추가함니다 !!
        // this.showPopup();
    }

    //예시작성법 1. 이렇게 기능을 할 함수 만들고 
    // showPopup() { 

    //      $('#modalTriggerButton').click();}

    // myModal = new bootstrap.Modal(document.getElementById('myModal'), options)
}



//필수 지우면 안돼용 맨 막줄에 있어야 해용
// new Home()자리에 Home을 자기 클래스 이름으로 고곡
window.onload = () =>{
    new Home();
}