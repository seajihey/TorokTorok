// nav 불러오기
import { Nav } from './nav.js';
import { Db } from './db.js';

class Home {
    constructor() {

        /* 현재 날짜저장*/
        this.date = new Date();
        /*현재 달 인덱스( 젤 처음load시, 현재달. 옆으로넘기면 그 달로 인덱스 추가됨)/*/
        this.currentIndex = this.date.getMonth();
        


        /* nav불러오기*/
        this.navTool = new Nav();
        this.navTool.fetchingNav('home', 'nav');
        /* db불러오기*/
        this.db = new Db();
        

        /* 로그인으로부터 불러온 내 정보 저장 */
        this.id= "";
        this.pw = "";
        this.code = "";
        this.getUserInfo();
        /* 달력 date 셋팅 */
        this.getDays();
        /* 달력 slider 셋팅 */
        this.getSlick();
        this.showModal();
        this.closeModal();
        /* nav에 유저정보 보내기를 통해, 다른 페이지에서도 로그인된 유저 불러오게끔 */
        // 어차피 내보내기니까 마지막에 설정하기
        // nav는 모든 페이지에 공통으로 연결되어있기에 가능함 
        // 백엔드 연결했다면 이런 일은....없었겠다만...시간부족...
        this.navTool.fetchingUser();

    }

    getUserInfo(){
        //home.js에서 쓸 데이터 저장
        const { id, pw, code } = JSON.parse(localStorage.getItem("userInfo"));
        this.id=id;
        this.pw=pw;
        this.code=code;
        console.log(id);
    }


    /*  달력 하나 셋팅  =저번달 남은 date + 이번달 date + 다음달 date */
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
        // 해당 날짜에 맞는 이미지 데이터를 가져오기 (record에 대한 데이터)
        const imageData = this.db.record.find((record) => {
            const recordDate = new Date(record.date);
            return recordDate.getFullYear() === viewYear && recordDate.getMonth() === viewMonth && recordDate.getDate() === date;
        });

        // 이미지 경로
        const imagePath = imageData ? imageData.image : ''; 

        return `
            <div class="${dateClass}" data-day="${date}">
                <a class="showModal">
                    <div class="dateText">${date}</div>
                    ${imagePath ? `<img src="${imagePath}" alt="">` : ''}
                </a>
            </div>
        `;
    }).join('');
    
            head.querySelector('.year').textContent = `${viewYear}년`;
            head.querySelector('.month').textContent = `${viewMonth + 1}월`;
        });
    }

    /* slider 셋팅 . position으로 하기엔 어려워서 slick api사용 */
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
    showModal() {
        const showModalElements = document.querySelectorAll('.showModal');
        showModalElements.forEach(showModalElement => {
            showModalElement.addEventListener('click', () => {
                const modalFrame = document.querySelector('.modalFrame');
                modalFrame.classList.add('active');
                modalFrame.classList.remove('unactive');
                modalFrame.style.zIndex = "99999999";
            });
        });
    }
    closeModal(){
        const showModalElements = document.querySelector('.modalFrame').contentWindow.document.querySelector('.back');
        showModalElements.addEventListener('click', () => {
            const modalFrame = document.querySelector('.modalFrame');
            console.log(modalFrame);
            modalFrame.classList.add('unactive');
            modalFrame.classList.remove('active');
            modalFrame.style.zIndex = "-99999";
            // console.log(showModalElements);
        });
    
    }

    exportLoginInfo() {
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

// 필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () => {
    new Home();
};
