// nav 불러오기
import{ Nav } from './nav.js';
import{ Db } from './db.js';
class Firends{

    constructor(){
        /* 자주쓰는 변수 저장*/
        //현재 날짜저장
        this.pages= document.querySelectorAll('.fpage');

        /* nav불러오기*/
        this.navTool = new Nav();
        this.navTool.fetchingNav('friend','nav');
        /* db불러오기*/
        this.db = new Db();


        /* 함수 */
        this.setPaging();
    }
    /*페이지 선택에따라 unacitve속성 와리가리 */
    setPaging(){
            const firstpage = document.querySelector('.firstPage');
            const secondpage = document.querySelector('.secondPage');
            const selector1Btn = document.querySelectorAll('.fS1');
            const selector2Btn = document.querySelectorAll('.fS2');
        
            selector1Btn[1].addEventListener('click', () => {
                secondpage.classList.add('unactive');
                firstpage.classList.remove('unactive');
                console.log("여러번되니?")
            });
        
            selector2Btn[0].addEventListener('click', () => {
                firstpage.classList.add('unactive');
                secondpage.classList.remove('unactive');
                console.log("여러번되니?")

            });

        

    }



}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Firends();
}