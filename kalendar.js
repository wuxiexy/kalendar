/*
* 日历插件
* author wx
*
* */

/*;(function (w, doc) {

}(window, document));*/


// param: el 元素的 id
function Kalendar(el, option) {

    var doc = document
        , win = window
        , i
        , len
        , current
        , calendars = {}
        , str = ''
        , currentCalendar = ''
        // , thatVeryDay = ''              // 当天

        , d = new Date()
        , m = d.getMonth()+1                                // 当前月份
        , selectTheMonth = ''                               // 选中的月份
        , y = d.getFullYear()                               // 当前年份
        , selectTheYear = ''                                // 选中的年份
        , UTCDate = d.getUTCDate()                          // 当天
        , selectDay = ''                                    // 当前选中的日期

        , currentProvMonth = ''                             // 上个月
        , provMonthLastDay = ''
        , currentNextMonth = ''                             // 下个个月
        // , nextMonth = ''                             // 下个个月

        , currentMonthFirstDay = ''                 // 当前月份的第一天，可用于处理1号是礼拜几
        // , hasMonthFirstDay = false

        , container = doc.getElementsByClassName('Kalendar-popop')[0]
        , ele = doc.getElementById(el)
        /*, opt = {
            width: '300px'
        }*/

        , dcm = ''

    ;



    // console.log(y, m, UTCDate);
    console.log(currentMonthFirstDay);
    // console.log(y, m, UTCDate);



    // 绘制日历
    // number
    function drawCalendar(year,month) {


        if(year&&month){
            d = new Date(year, month);
        }else{
            // 默认年份
            d = new Date(y, m);
            // month = d.getMonth()+1;                                 // 当前月份
            // selectTheMonth = '';                                    // 选中的月份
            // year = d.getFullYear();                                 // 当前年份
            year = y;
            month = m;
            // UTCDate = d.getUTCDate();                               // 当天
        }



        console.log('月'+month);

        dcm = ('00'+month).slice(-2);

        currentCalendar = calendars[year+dcm];
        // console.log(year+month);
        // console.log(currentCalendar);

        if(!currentCalendar){
            // console.log(month);

            if(month!==1){
                provMonthLastDay = new Date(year, month, 0).getDate();
                // console.log(new Date(year, month-1, 0).getDate());      // 上个月最后一天
            }else{
                // console.log(new Date(year-1, 12, 0).getDate());         // 上个月最后一天
                provMonthLastDay = new Date(year-1, 12, 0).getDate();

            }

            // console.log(year)
            console.log(provMonthLastDay)
            console.log(d.getDate())

            currentMonthFirstDay = d.getDay();      // 当月第一天/星期几
            str = '';
            for(i=1;i<36;i++){
                if(currentMonthFirstDay>-1){
                    str += '<div class="kp-col"><span class="kp-date">'+(provMonthLastDay-currentMonthFirstDay)+'</span></div>'
                } else {

                }
            }



            console.log(currentMonthFirstDay);



            // console.log(new Date(year, month, 0).getDate());

            return str;
        }
        return currentCalendar;
    }


    drawCalendar(2018,9);
    console.log('======================================');
    drawCalendar();
    console.log('======================================');
    drawCalendar(2018,11);



    // console.log(new Date(2018, 10, 0).getDate());


    if (container){
        // console.log(1);
        // drawCalendar(y, m);

    } else {
        // 还没有创建
        container = doc.createElement('div');
        container.className = 'Kalendar-popop';
        console.log(2);
        doc.body.appendChild(container);
    }

}















