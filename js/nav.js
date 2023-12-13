/* nav 공통 모듈 설정용 내보내기 */
export class Nav{

    constructor(){
        this.id = "";
        this.code = "";
        this.fetchingUser();
        this.exportLoginInfo();
    }

    fetchingNav(pageName,myNavIdName){
        fetch('nav.html')
            .then(Response => Response.text())
            .then(html=>{
                
                document.getElementById(myNavIdName).innerHTML = html;
                this.navFisrt(pageName,myNavIdName);
                
            })
            .catch(error=>console.error('어라라 에러면 곤란한데...',error));
            
    }
    fetchingUser(){
        const {id ,pw,code} = JSON.parse(localStorage.getItem("userInfo"));
        this.id = id
        this.code = code;
        console.log("nav에서도 작동하지롱");




    }

    navFisrt(pageName, myNavIdName){
        const nav = document.getElementById(myNavIdName); 
        const temp = pageName + "Text";
        const tempImg = pageName + "Img";
        
        if(nav){
            const textElement = nav.querySelector('.' + temp);
            const ImgElement = nav.querySelector('.' + tempImg); 
    
            if(textElement){
                textElement.style.color = "#E97E41";
                textElement.classList.remove('nav_unactive'); // unactive 클래스 제거

            }
            if(ImgElement){
                ImgElement.classList.add('nav_active');
            }
            else{
             ImgElement.classList.remove('nav_active');
             textElement.style.color="none;"   
            }
            // 로그인버튼을 로그아웃 버튼으로 바꾸기
            const setlogout = document.querySelector('.nav_login');
            if(this.id == ""){
                setlogout.innerHTML=`<a href="./login.html">로그아웃&nbsp;▶</a>`

            }
        }
        
    }
    exportLoginInfo() {
        // Wait for the DOMContentLoaded event
        document.addEventListener('DOMContentLoaded', () => {
            const datas = {
                id: this.id,
                code: this.code,
            }

            const aTag = document.querySelector('a');
            if (aTag) {
                aTag.addEventListener('click', () => {
                    if (this.dataTrue == true) {
                        localStorage.setItem("userInfo", JSON.stringify(datas));
                    }
                });
            }
    
        });
    }
    
}

window.onload = () => {
    new Nav();
};
