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
        , calendarStr = ''
        , currentCalendar = ''

        , d = new Date()
        , y = d.getMonth()+1
        , m = d.getFullYear()
        , UTCDate = d.getUTCDate()


        , container = doc.getElementsByClassName('Kalendar-popop')[0]
        , ele = doc.getElementById(el)
        /*, opt = {
            width: '300px'
        }*/

    ;

    console.log(y, m, UTCDate);

    // 绘制日历
    function drawCalendar(d) {
        currentCalendar = calendars[d];
        if(!calendars[d]){
            return calendarStr;
        }
        return currentCalendar;
    }




    if (container){
        console.log(1);
    } else {
        // 还没有创建
        container = doc.createElement('div');
        container.className = 'Kalendar-popop';
        console.log(2);
        doc.body.appendChild(container);
    }





}





















