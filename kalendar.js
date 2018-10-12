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
        , container = doc.getElementsByClassName('Kalendar-popop')[0]
        , ele = doc.getElementById(el)
        /*, opt = {
            width: '300px'
        }*/
    ;





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





















