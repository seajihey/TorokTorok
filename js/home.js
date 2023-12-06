// nav 불러오기
import{ Nav } from './nav.js';
import{ Db } from './db.js';
class Home{

    constructor(){
        /* 자주쓰는 변수 저장*/
        //현재 날짜저장
        this.date = new Date();
        //현재 달 인덱스( 젤 처음load시, 현재달. 옆으로넘기면 그 달로 인덱스 추가됨)
        this.currentIndex = this.date.getMonth();
        //달 list
        this.allMonthList = [1,2,3,4,5,6,7,8,9,10,11,12]



        /* nav불러오기*/
        this.navTool = new Nav();
        this.navTool.fetchingNav('home','nav');
        /* db불러오기*/
        this.db = new Db();


        /* 함수 */
        this.getDays();
    }

    
    /* 달렦의 빈공간에 저번달 날짜와 다음달날짜까지 가져오기 함수 */
    getDays(){
        document.querySelectorAll('.head').forEach(head => {
            const dataList = parseInt(head.getAttribute('data-list'), 10);
            const currentDate = new Date(); // 현재 날짜
            const targetDate = new Date(currentDate);
    
            targetDate.setMonth(targetDate.getMonth() + dataList - 2);
            
            if (targetDate < currentDate) {
                targetDate.setFullYear(targetDate.getFullYear() + 1);
            } else if (targetDate > currentDate) {
                targetDate.setFullYear(targetDate.getFullYear() - 1);
            }
    
            const viewYear = targetDate.getFullYear();
            const viewMonth = targetDate.getMonth();
            const firstDay = new Date(viewYear, viewMonth, 1).getDay();
            const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
    
            const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();
            const nextMonthFirstDay = new Date(viewYear, viewMonth + 1, 1).getDay();
    
            const prevDates = [];
            for (let i = firstDay - 1; i >= 0; i--) {
                prevDates.unshift(prevMonthLastDay - i);
            }
    
            const thisDates = [];
            for (let i = 1; i <= lastDay; i++) {
                thisDates.push(i);
            }
    
            const nextDates = [];
            for (let i = 1; i < 7 - nextMonthFirstDay; i++) {
                nextDates.push(i);
            }
    
            const dates = prevDates.concat(thisDates, nextDates);
    
            const datesContainer = head.querySelector('.dates');
            datesContainer.innerHTML = dates.map(date => `<div class="date" data-day="${date}">${date}</div>`).join('');
            
            head.querySelector('.year').textContent = `${viewYear}년`;
            head.querySelector('.month').textContent = `${viewMonth + 1}월`;
        });
    }


}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Home();
}