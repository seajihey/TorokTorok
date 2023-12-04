// nav 불러오기
import{ Nav } from './nav.js';

class Home{

    constructor(){
        // 자주쓰는 변수 저장
        

        // nav불러오기
        this.navTool = new Nav();
        this.navTool.fetchingNav('home','nav');


        //함수
        this.getCalSetting();
    }

    
    getCalSetting(){
        const date = new Date();
        const viewYear = date.getFullYear(); 
        const viewMonth = date.getMonth();
        
        document.querySelector('.year').textContent = `${viewYear}년`;
        document.querySelector('.month').textContent = `${viewMonth + 1}월`;
        this.getDays();
    }
    /* 달렦의 빈공간에 저번달 날짜와 다음달날짜까지 가져오기 함수 */
    getDays(){
        const date = new Date();
        const viewYear = date.getFullYear(); 
        const viewMonth = date.getMonth();
        
        const prevLast = new Date(viewYear, viewMonth, 0);
        const thisLast = new Date(viewYear, viewMonth + 1, 0);

        const PLDate = prevLast.getDate();
        const PLDay = prevLast.getDay();

        const TLDate = thisLast.getDate();
        const TLDay = thisLast.getDay();

        // 달마다 날짜 담기
        const prevDates = [];
        const thisDates = [...Array(TLDate + 1).keys()].slice(1);
        const nextDates = [];

        if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
        }

        for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
        }

        const dates = prevDates.concat(thisDates, nextDates);

        dates.forEach((date, i) => {
          dates[i] = `<div class="date">${date}</div>`;
        })
        
        document.querySelector('.dates').innerHTML = dates.join('');
    }



}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Home();
}