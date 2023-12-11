// nav 불러오기
import { Nav } from './nav.js';
import { Db } from './db.js';

class Home {
    constructor() {
        /* 자주쓰는 변수 저장*/
        //현재 날짜저장
        this.date = new Date();
        //현재 달 인덱스( 젤 처음load시, 현재달. 옆으로넘기면 그 달로 인덱스 추가됨)
        this.currentIndex = this.date.getMonth();

        /* nav불러오기*/
        this.navTool = new Nav();
        this.navTool.fetchingNav('home', 'nav');
        /* db불러오기*/
        this.db = new Db();

        /* 함수 */
        this.getDays();
        this.getSlick();
    }

    /* 달력에 저번달 날짜와 다음달 날짜 가져오기 함수 */
    getDays() {
        document.querySelectorAll('.head').forEach((head) => {
            const dataList = parseInt(head.getAttribute('data-list'), 10);
            const currentDate = new Date(); // 현재 날짜
            const targetDate = new Date(currentDate);

            targetDate.setMonth(this.currentIndex + dataList);

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
            datesContainer.innerHTML = dates.map((date, index) => {
                let dateClass = 'date';
                
                // 이전 달 날짜에 클래스 추가
                if (index < firstDay) {
                    dateClass += ' prevMonth';
                }
                // 다음 달 날짜에 클래스 추가
                else if (index >= (firstDay + lastDay)) {
                    dateClass += ' nextMonth';
                }
    
                return `<div class="${dateClass}" data-day="${date}">${date}</div>`;
            }).join('');
    
            head.querySelector('.year').textContent = `${viewYear}년`;
            head.querySelector('.month').textContent = `${viewMonth + 1}월`;
        });
    }

    // 포지션 정하기 넘 어려워서 slick api 사용
    getSlick(){
        $('.seeWrap').slick({
            centerMode: true,
            centerPadding: '20px',
            spaceBetween: 200,
            centerMode: true,   
            swipe:true,
            dots : true,
            slidesToShow: 3,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: '40px',
                  spaceBetween: 200,
                  dots : true,

                  slidesToShow: 3
                }
              },
              {
                breakpoint: 480,
                settings: {       

                  arrows: false,
                  centerMode: true,
                  centerPadding: '40px',
                  slidesToShow: 1
                }
              }
            ]
          });


    }

}

// 필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () => {
    new Home();
};
