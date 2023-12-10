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
        // this.get_year();
        this.chart1();

    }

    /*페이지 선택에따라 unacitve속성 와리가리 */

    // get_year(){
    //     let result ={};
    //     const year_check = document.getElementById('year_check_right');
    //     result.city = year_check.options[year_check.selectedIndex].value;
    //     console.log(result.city);
    // }

    chart1(){
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawStacked);

        let db = this.db;

        let month_recode_cnt = {'01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0};
        for(let i = 0; i < db.record.length; i++){
            month_recode_cnt[db.record[i].date.split('.')[1]] += 1;
            console.log(month_recode_cnt);
        }

        function drawStacked() {
            var data = google.visualization.arrayToDataTable([
                ['Element', '연간 기록 수', { role: 'style' }],
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
                title: '연간 기록 수',
                titleTextStyle: {
                    fontName: 'Pretendard-SemiBold',
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
                    height: 550,
                    left: 120
                }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart1_div'));
            chart.draw(data, options);
            }
    }

}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Stat();
}