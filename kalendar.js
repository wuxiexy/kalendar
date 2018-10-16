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
        , m = d.getMonth() + 1                                // 当前月份
        , selectTheMonth = ''                               // 选中的月份
        , y = d.getFullYear()                               // 当前年份
        , selectTheYear = ''                                // 选中的年份
        , UTCDate = d.getUTCDate()                          // 当天
        , selectDay = ''                                    // 当前选中的日期

        , currentProvMonth = ''                             // 上个月
        , provMonthLastDay = ''
        , currentNextMonth = ''                             // 下个个月
        , nextMonthNum = ''                                 // 下个月的有多少显示的

        , currentMonthFirstDay = ''                 // 当前月份的第一天，可用于处理1号是礼拜几
        , currentMonthDayCount = false

        , wrapper = doc.getElementsByClassName('Kalendar-popop')[0]

        , container = ''

        , ele = doc.getElementById(el)
        /*, opt = {
            width: '300px'
        }*/

        , dcm = ''
        , nextMouth = 1

        , yearEle =  doc.getElementsByClassName('kp-h-year')[0]
        , mouthEle =  doc.getElementsByClassName('kp-h-month')[0]
<<<<<<< HEAD

        // , kp-container


=======
        
        // , kp-container
        
        
>>>>>>> da5ac5ae7c8e51ef6b2a041ccd35bd8e644bbee2
    ;

        
        



    // console.log(y, m, UTCDate);
    console.log(currentMonthFirstDay);
    // console.log(y, m, UTCDate);


    // 绘制日历
    // number
    function drawCalendar(year, month) {
        console.log(year+'年'+month);
        currentCalendar = calendars[year+month];
        if(currentCalendar) {
            return currentCalendar;
        }


        // 上个月天数
        if (month !== 1) {
            provMonthLastDay = new Date(year, month - 1, 0).getDate();
        } else {
            provMonthLastDay = new Date(year - 1, 12, 0).getDate();
        }
        console.log('上个月天数' + provMonthLastDay);


        currentMonthDayCount = new Date(year, month, 0).getDate() + 1;      // 当月天数
        console.log('当月天数' + currentMonthDayCount);

        currentMonthFirstDay = new Date(year, month - 1).getDay()-1;        // 当月第一天/星期几
        console.log('当月第一天/星期几' + currentMonthFirstDay);
        console.log(currentMonthFirstDay);


        str = '';
        current = 1;
        nextMouth = 1;
        var num = currentMonthFirstDay + currentMonthDayCount;
        nextMonthNum = num%7!==0 ? 7-num%7 : 0;
        console.log(num);
        for (i = 0; i < 42; i++) {
            if (currentMonthFirstDay > -1) {
                str += '<div class="kp-col"><span class="prov-mouth-day">' + (provMonthLastDay - currentMonthFirstDay--) + '</span></div>'
            } else if (current < currentMonthDayCount) {
                str += '<div class="kp-col"><span class="kp-date">' + current++ + '</span></div>'
            } else if(nextMonthNum-->0) {
                str += '<div class="kp-col"><span class="next-mouth-day">' + nextMouth++ + '</span></div>';
                // console.log(num<=35, num, i);
                /*if (num<=35) {
<<<<<<< HEAD
=======

>>>>>>> da5ac5ae7c8e51ef6b2a041ccd35bd8e644bbee2
                    break;
                }*/
            }
        }
        calendars[year+month] = str;
        return str;

    }


    // console.log(new Date(2018, 10, 0).getDate());
    container = doc.getElementsByClassName('kp-container')[0];

    if (wrapper) {
        // console.log(1);
        // drawCalendar(y, m);

        container.innerHTML = drawCalendar(y, m);
        yearEle.innerHTML = y;
        mouthEle.innerHTML = m;
        // console.log('======================================');
        // drawCalendar();
        // console.log('======================================');
        // drawCalendar(2018,11);


    } else {
        // 还没有创建
        wrapper = doc.createElement('div');
        wrapper.className = 'Kalendar-popop';
        console.log(2);
        doc.body.appendChild(wrapper);

    }


    function nextMonth() {

    }

    console.log(m);

    doc.getElementsByClassName('next-month')[0].addEventListener('click', function (e) {

        if (m === 12) {
            m = 0;
            y++;
        }

        var a = drawCalendar(y, ++m);
        // console.log(m);
        // console.log(y);
        container.innerHTML = a;
        yearEle.innerHTML = y;
        mouthEle.innerHTML = m;
    }, false);

    doc.getElementsByClassName('prov-month')[0].addEventListener('click', function (e) {

        if (m === 1) {
            m = 13;
            --y;
        }

        var a = drawCalendar(y, --m);
        // console.log(m);
        // console.log(y);
        container.innerHTML = a;
        yearEle.innerHTML = y;
        mouthEle.innerHTML = m;
    }, false);


    doc.getElementsByClassName('prov-year')[0].addEventListener('click', function (e) {
        container.innerHTML = drawCalendar(--y, m);
        yearEle.innerHTML = y;
        mouthEle.innerHTML = m;
    }, false);

    doc.getElementsByClassName('next-year')[0].addEventListener('click', function (e) {
        container.innerHTML = drawCalendar(++y, m);
        yearEle.innerHTML = y;
        mouthEle.innerHTML = m;
    }, false);


}


