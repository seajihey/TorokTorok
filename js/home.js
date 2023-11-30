// nav 불러오기
import{ Nav } from './nav.js';

class Home{

    constructor(){
        this.navTool = new Nav();
        // home 파라미터 자리에 자기 html페이지 이름 , nav 파라미터 자리에 자기 html속 nav id넣기!!
        this.navTool.fetchingNav('home','nav');
    }



}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Home();
}