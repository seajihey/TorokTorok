// nav 불러오기
class Main{

    constructor(){
        // home 파라미터 자리에 자기 html페이지 이름 , nav 파라미터 자리에 자기 html속 nav id넣기!!

        //2. 여기에 실행 순서대로 추가함니다 !!
        //팝업
        this.showPopup();

    }

    //예시작성법 1. 이렇게 기능을 할 함수 만들고 

    showPopup() {
        // 모달을 트리거합니다
        $("#modal").modal("show");
    }

    
}



//필수 지우면 안돼용 맨 막줄에 있어야 해용
// new Home()자리에 Home을 자기 클래스 이름으로 고곡
window.onload = () =>{
    new Main();
}