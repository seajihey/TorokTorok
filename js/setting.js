// nav 불러오기
import{ Nav } from './nav.js';
import{ Db } from './db.js';

class Setting{

    constructor(){
        /* 자주쓰는 변수 저장*/
        //현재 날짜저장

        /* nav불러오기*/
        this.navTool = new Nav();
        this.navTool.fetchingNav('setting','nav');
        /* db불러오기*/
        this.db = new Db();

        /* 함수 */
        this.gkatndlfma();
    }
     
    gkatndlfma(){
        const toggleList = document.querySelectorAll(".toggleSwitch");
        toggleList.forEach(($toggle) => {
            $toggle.onclick = () => {
                $toggle.classList.toggle('active');
            }
        });

    }

}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Setting();
}