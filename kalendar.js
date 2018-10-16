/*
* 日历插件
* author wx
*
* */

// param: el 元素的 id
function Kalendar(el, option) {

    var doc = document
        , win = window
        , i
        , len
        , current
        , calendars = {}
        , str = ''
        , num = ''
        , currentCalendar = ''
        // , thatVeryDay = ''              // 当天

        , d = new Date()
        , m = d.getMonth() + 1                                // 当前月份
        , selectTheMonth = m                               // 选中的月份
        , y = d.getFullYear()                               // 当前年份
        , selectTheYear = y                                // 选中的年份
        , UTCDate = d.getUTCDate()                          // 当天
        , selectTheDay = ''                                    // 当前选中的日期

        , currentProvMonth = ''                             // 上个月
        , provMonthLastDay = ''
        , currentNextMonth = ''                             // 下个个月
        , nextMonthNum = ''                                 // 下个月的有多少显示的

        , currentMonthFirstDay = ''                 // 当前月份的第一天，可用于处理1号是礼拜几
        , currentMonthDayCount = false

        , wrapper = doc.getElementsByClassName('Kalendar-popop')[0]
        , wrapperStyle = ''
        , container = ''

        , ele = doc.getElementById(el)
        , eleValue = ele.value
        , eleLeft = ''
        , eleTop = ''
        , eleOffset = ''
        , eleHeight = ''


        , dcm = ''
        , nextMouth = 1

        , yearEle = ''
        , mouthEle = ''

        , tag = ''
        , tagText = ''
        , day = ''
        , tagName = ''
        // , kp-container
        , that = ''
        , hasSelect = false
        , currentSelect = ''

        , wrapperHtml = '<div class="kp-header">\n' +
        '        <!-- 头部 -->\n' +
        '        <div class="kp-h-l">\n' +
        '            <span class="prov-year"><<</span><span class="prov-month"><</span>\n' +
        '        </div>\n' +
        '        <div class="kp-h-c">\n' +
        '            <span class="kp-h-year" contenteditable="true"></span><span class="kp-h-month" contenteditable="true"></span>\n' +
        '        </div>\n' +
        '        <div class="kp-h-r">\n' +
        '            <span class="next-month">></span><span class="next-year">>></span>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="kp-content">\n' +
        '        <!-- 日历 -->\n' +
        '        <div class="kp-c-h">\n' +
        '            <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>\n' +
        '        </div>\n' +
        '        <div class="kp-container">\n' +
        '            <!--<div class="kp-col"><span class="kp-date">1</span></div>-->\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="kp-footer">\n' +
        '        今日\n' +
        '    </div>'
    ;


    if (eleValue) {
        eleValue = eleValue.split('-');
        selectTheYear = y = eleValue[0];
        selectTheMonth = m = eleValue[1];
        selectTheDay = eleValue[2];
    } else {
        selectTheYear = y;
        selectTheMonth = m;
    }

    function getOffsetLeftTop(obj) {
        var ol = obj.offsetLeft
            , ot = obj.offsetTop
            , op = obj.offsetParent;
        while (op) {
            ol += op.offsetLeft;
            ot += op.offsetTop;
            op = op.offsetParent;
        }
        return [ol,ot];
    }


    // 绘制日历
    // number
    function drawCalendar(year, month) {
        if (month !== 1) {
            provMonthLastDay = new Date(year, month - 1, 0).getDate();
        } else {
            provMonthLastDay = new Date(year - 1, 12, 0).getDate();
        }
        currentMonthDayCount = new Date(year, month, 0).getDate() + 1;      // 当月天数
        currentMonthFirstDay = new Date(year, month - 1).getDay() - 1;      // 当月第一天/星期几

        str = '';
        current = 1;
        nextMouth = 1;
        num = currentMonthFirstDay + currentMonthDayCount;
        nextMonthNum = num % 7 !== 0 ? 7 - num % 7 : 0;
        // console.log(num);
        for (i = 0; i < 42; i++) {
            if (currentMonthFirstDay > -1) {
                str += '<div class="kp-col"><span class="prov-mouth-day">' + (provMonthLastDay - currentMonthFirstDay--) + '</span></div>'
            } else if (current < currentMonthDayCount) {
                // 当月 渲染
                /*if (current === 10) {
                    console.log('===================');
                    console.log(selectTheMonth);
                    console.log(month);
                    console.log(selectTheMonth == month);
                    console.log(selectTheYear);
                    console.log(year);
                    console.log(selectTheYear == year);
                    console.log(selectTheDay);
                    console.log(current);
                    console.log(selectTheDay == current);
                    // console.log(selectTheYear==y&&selectTheMonth==m&&selectTheDay==current);
                }*/

                if (selectTheYear == year && selectTheMonth == month && selectTheDay == current) {
                    // console.log(123123123);
                    str += '<div class="kp-col"><span data-type="selected" class="kp-date">' + current++ + '</span></div>';
                }
                if (current !== UTCDate) {
                    str += '<div class="kp-col"><span class="kp-date">' + current++ + '</span></div>';
                } else {
                    str += '<div class="kp-col"><span class="kp-date kp-current">' + current++ + '</span></div>';   // 当天
                }

            } else if (nextMonthNum-- > 0) {
                str += '<div class="kp-col"><span class="next-mouth-day">' + nextMouth++ + '</span></div>';
            }
        }
        return str;
    }


    ele.addEventListener('click', function (e) {
        that = this;

        // 求得ele元素的偏移
        eleOffset = getOffsetLeftTop(that);
        eleLeft = eleOffset[0];
        eleTop = eleOffset[1];
        eleHeight = that.offsetHeight;

        if (wrapper) {
            wrapperStyle.display = 'block';
            container.innerHTML = drawCalendar(selectTheYear, selectTheMonth);
            yearEle.innerHTML = selectTheYear;
            mouthEle.innerHTML = selectTheMonth;
            wrapperStyle.left = eleLeft+'px';
            wrapperStyle.top = eleTop+eleHeight+'px';
        } else {
            wrapper = doc.createElement('div');
            wrapper.className = 'Kalendar-popop';
            wrapper.innerHTML = wrapperHtml;
            wrapperStyle = wrapper.style;
            doc.body.appendChild(wrapper);

            container = doc.getElementsByClassName('kp-container')[0];
            container.innerHTML = drawCalendar(selectTheYear, selectTheMonth);
            yearEle = doc.getElementsByClassName('kp-h-year')[0];
            mouthEle = doc.getElementsByClassName('kp-h-month')[0];
            yearEle.innerHTML = selectTheYear;
            mouthEle.innerHTML = selectTheMonth;
            wrapperStyle.left = eleLeft+'px';
            wrapperStyle.top = eleTop+eleHeight+'px';


            doc.getElementsByClassName('next-month')[0].addEventListener('click', function (e) {

                if (m === 12) {
                    m = 0;
                    y++;
                }
                container.innerHTML = drawCalendar(y, ++m);
                yearEle.innerHTML = y;
                mouthEle.innerHTML = m;
            }, false);

            // 按钮上个月
            doc.getElementsByClassName('prov-month')[0].addEventListener('click', function (e) {

                if (m === 1) {
                    m = 13;
                    --y;
                }
                container.innerHTML = drawCalendar(y, --m);
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

            doc.getElementsByClassName('kp-container')[0].addEventListener('click', function (e) {
                that = this;
                tag = e.target;
                if (tag.nodeName.toLowerCase() === 'span') {
                    selectTheDay = tag.innerHTML;
                    selectTheYear = y;
                    selectTheMonth = m;
                    hasSelect = that.querySelector('span[data-type="selected"]');
                    if (hasSelect) {
                        hasSelect.removeAttribute('data-type');
                    }
                    tag.setAttribute('data-type', 'selected');
                    ele.value = y + '-' + m + '-' + selectTheDay;
                    wrapperStyle.display = 'none';
                }
            }, false);

        }
    }, false);

}


