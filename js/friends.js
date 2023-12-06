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
        this.firstpage = document.querySelector('.firstpage');
        this.secondpage = document.querySelector('.secondpage');
        
        this.selector1Btn = document.querySelector('.fS1');
        this.selector2Btn = document.querySelector('.fS2');

        
        this.selector1Btn.addEventListener('click',()=>{
            //unactive초기화
            this.firstpage.classList.remove('unactive');
            this.secondpage.classList.remove('unactive');
            this.secondpage.classList.add('unactive');
        })


        this.selector2Btn.addEventListener('click',()=>{
            //unactive초기화
            this.firstpage.classList.remove('unactive');
            this.secondpage.classList.remove('unactive');
            this.firstpage.classList.add('unactive');
        })

    }



}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Firends();
}