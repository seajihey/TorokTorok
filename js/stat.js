// nav 불러오기
import{ Nav } from './nav.js';
import{ Db } from './db.js';

class Stat{

    constructor(){

        /* nav불러오기*/
        this.navTool = new Nav();
        this.navTool.fetchingNav('stat','nav');
        /* db불러오기*/
        this.db = new Db();
    }

    /*페이지 선택에따라 unacitve속성 와리가리 */


}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Stat();
}