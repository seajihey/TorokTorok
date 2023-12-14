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
        /*통계 차트 불러오기*/
        this.setupMonthRecord();

        // this.get_year();
        this.chart1();

        this.setupEventListeners();
    }

    

    /*페이지 선택에따라 unacitve속성 와리가리 */


    
    get_year_left(){
        let year_check = document.getElementById('year_check_left');
        let result = year_check.options[year_check.selectedIndex].value;
        return result;
    }

    get_year_right(){
        let year_check = document.getElementById('year_check_right');
        let result = year_check.options[year_check.selectedIndex].value;
        return result;
    }
    
    

    chart1(){
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawStacked);

        let db = this.db;

        let month_recode_cnt = {'01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0};
        let WantYear = this.get_year_left();
        let recode_data = []
        

        for(let i = 0; i < db.record.length; i++){
            recode_data = db.record[i].date.split('.');
            if(WantYear == recode_data[0])
                month_recode_cnt[recode_data[1]] += 1;
        }

        function drawStacked() {
            var data = google.visualization.arrayToDataTable([
                ['Element', '월간 기록 수', { role: 'style' }],
                ['1월', month_recode_cnt['01'], '#E97E41'],            // RGB value
                ['2월', month_recode_cnt['02'], '#E97E41'],            // English color name
                ['3월', month_recode_cnt['03'], '#E97E41'], 
                ['4월', month_recode_cnt['04'], '#E97E41'], 
                ['5월', month_recode_cnt['05'], '#E97E41'], 
                ['6월', month_recode_cnt['06'], '#E97E41'], 
                ['7월', month_recode_cnt['07'], '#E97E41'], 
                ['8월', month_recode_cnt['08'], '#E97E41'], 
                ['9월', month_recode_cnt['09'], '#E97E41'], 
                ['10월', month_recode_cnt['10'], '#E97E41'], 
                ['11월', month_recode_cnt['11'], '#E97E41'],
                ['12월', month_recode_cnt['12'], '#E97E41']  

            ]);

            var options = {
                title: '월간 기록 수',
                titleTextStyle: {
                    // fontName: 'Pretendard-SemiBold',
                    fontSize: 20
                },
                // height: 700,
                // isStacked: true,
                hAxis: {
                    ticks: [1, 2, 3, 4, 5, 6],
                    textStyle:{
                        fontSize: 13
                    }
                },
                legend: {
                    position: 'none'},
                chartArea: {
                    height: 400,
                    // left: 120
                }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart1_div'));
            chart.draw(data, options);
            }
    }

    


    setupMonthRecord(){
        let db = this.db;
        let WantYear = this.get_year_right();
        let recode_data = []

        let inner_section_frame = document.querySelector('.inner-section-frame');
        let inner_section = document.createElement('div');
        inner_section.classList.add('inner_section');
        inner_section_frame.appendChild(inner_section);

        for(let i = 0; i < db.record.length; i++){
            recode_data = db.record[i].date.split('.');
            if (WantYear == recode_data[0]){
                let inner_content = document.createElement('div');
                inner_content.classList.add('inner-content');
                inner_section.appendChild(inner_content);
        
                let month_content = document.createElement('div');
                month_content.classList.add('month-content');
                inner_content.appendChild(month_content);
    
                let month_record_img = document.createElement('div');
                month_record_img.classList.add('month_record_img');
                month_content.appendChild(month_record_img);
    
                let image = document.createElement('img');
                month_record_img.appendChild(image);
        
                let month_record_text = document.createElement('div');
                month_record_text.classList.add('month_record_text');
                month_content.appendChild(month_record_text);
        
                let month_record_title = document.createElement('div');
                month_record_title.classList.add('month_record_title');
                month_record_text.appendChild(month_record_title);
    
                let month_record_date = document.createElement('div');
                month_record_date.classList.add('month_record_date');
                month_record_text.appendChild(month_record_date);
    
                
                let month_record_oneline = document.createElement('div');
                month_record_oneline.classList.add('month_record_oneline');
                month_record_text.appendChild(month_record_oneline);
        
                image.src = db.record[i].image;
                month_record_title.textContent = db.record[i].title;
                month_record_date.textContent = db.record[i].date;
                
                if(db.record[i].oneLineReview != '')
                    month_record_oneline.textContent = '\''+ db.record[i].oneLineReview + '\'';
            }
        }


    }
    
    reSetupMonthRecord(){
        let inner_section_frame = document.querySelector('.inner-section-frame');
        inner_section_frame.innerHTML="";
        this.setupMonthRecord();
    }
    

    setupEventListeners() {
        let year_check_left = document.getElementById('year_check_left');
        let year_check_right = document.getElementById('year_check_right');
        // onchange 이벤트에 이벤트 리스너 추가
        year_check_left.addEventListener('change', () => {
            // 이벤트가 발생할 때 get_year 메소드 호출
            this.get_year_left();
            // chart1 메소드도 호출하려면 여기에 추가
            this.chart1();
        });
        year_check_right.addEventListener('change', () => {
            // 이벤트가 발생할 때 get_year 메소드 호출
            this.get_year_right();
            // chart1 메소드도 호출하려면 여기에 추가
            // this.setupMonthRecord.monthClear();
            this.reSetupMonthRecord();
        });

    }
}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Stat();
}