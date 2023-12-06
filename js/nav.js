export class Nav{

    constructor(){
        
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

    navFisrt(pageName, myNavIdName){
        const nav = document.getElementById(myNavIdName); 
        const temp = pageName + "Text";
        const tempImg = pageName + "Img";
        
        if(nav){
            const textElement = nav.querySelector('.' + temp);
            const ImgElement = nav.querySelector('.' + tempImg); 
    
            if(textElement){
                textElement.style.color = "#E97E41";
                textElement.classList.remove('unactive'); // unactive 클래스 제거

            }
            if(ImgElement){
                ImgElement.classList.add('active');
            }
            else{
             ImgElement.classList.remove('active');
             textElement.style.color="none;"   
            }
        }
    }
    
}


