// nav 불러오기
import{ Nav } from './nav.js';

class Home{

    constructor(){
        // nav불러오기
        this.navTool = new Nav();
        this.navTool.fetchingNav('home','nav');


        //함수
        this.functionName();
    }

    functionName(){
        pass
    }





}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Home();
}