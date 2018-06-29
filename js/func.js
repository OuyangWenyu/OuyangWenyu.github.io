/*
	Coded by WUWEI
	jQuery func.js 2.0
*/
$(document).ready(function () {
    $(document.body).css('overflow', 'hidden');
    /******************************************************
     图库事件（IE中表现形式不一样）
     *******************************************************/
    var galleyTitles = $(".title div");
    var intervalID;
    autoClick();
    // 绑定未注册元素的左右点击切换事件
    $(".stage").on("click", ".left", function () {
        leftClick();
        clearInterval(intervalID);
        autoClick();
        return false;
    });
    $(".stage").on("click", ".right", function () {
        rightClick();
        clearInterval(intervalID);
        autoClick();
        return false;
    });

    //左击函数
    function leftClick() {
        var left = $('.left');
        var front = $('.front');
        var right = $('.right');
        var back = $('.back');

        left.removeClass('left').addClass('front');
        front.removeClass('front').addClass('right');
        right.removeClass('right').addClass('back');
        back.removeClass('back').addClass('left');

        var clickID = $('.front').index();
        bindTitle(clickID);
    }

    //右击函数
    function rightClick() {
        var right = $('.right');
        var front = $('.front');
        var left = $('.left');
        var back = $('.back');

        right.removeClass('right').addClass('front');
        front.removeClass('front').addClass('left');
        left.removeClass('left').addClass('back');
        back.removeClass('back').addClass('right');

        var clickID = $('.front').index();
        bindTitle(clickID);
    }

    // 图库说明联动函数
    function bindTitle(clickID) {
        $(".selected").removeClass('selected');
        galleyTitles.eq(clickID).addClass('selected');
    }

    //自动调用函数
    function autoClick() {
        intervalID = setInterval(rightClick, 5000);
    }


    /******************************************************
     蒙版响应函数
     *******************************************************/
    // 联系方式点击事件
    $(".button").click(function (event) {
        /* Act on the event */
        $(".mask").addClass('active');
        return false;
    });
    //蒙版消失
    $(".mask").click(function (event) {
        /* Act on the event */
        $(this).removeClass('active');
    });
    //防止冒泡
    $(".card").click(function (event) {
        /* Act on the event */
        return false;
    });

    /******************************************************
     assistant touch响应事件
     *******************************************************/
        //slider定位
    var circles = $(".circle a");
    var sum = circles.length;
    var r = 150;
    var flag = true;
    $(".info").click(function (event) {
        /* Act on the event */
        if (flag) {
            circles.each(function (index, el) {
                var x = Math.sin(index / (sum - 1) * Math.PI / 2) * r;
                var y = Math.cos(index / (sum - 1) * Math.PI / 2) * r;
                $(this).css({
                    left: x + "px",
                    bottom: y + "px"
                });
                $(this).addClass('active');
            });
            $(this).text("关闭");
            flag = false;
        }
        else {
            circles.each(function (index, el) {
                $(this).css({
                    left: 0 + "px",
                    bottom: 10 + "px"
                });
                $(this).removeClass('active');
            });
            $(this).text("导航");
            flag = true;
        }

        return false;
    });


    $(document.body).click(function (event) {
        /* Act on the event */
        $(".info").text("导航");
        circles.each(function (index, el) {
            $(this).css({
                left: 0 + "px",
                bottom: 10 + "px"
            });
            $(this).removeClass('active');
        });
        flag = true;
    });

    /******************************************************
     平滑滚动功能（hack IE,Firefox,Safiri）
     *******************************************************/
    //平滑滚动
    $("nav a").click(function (event) {
        /* Act on the event */
        var top = $($(this).attr('href')).offset().top;
        //hack IE,Firefox,Safiri
        var currentTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var speed = Math.abs((currentTop - top)) / 900 * 500;
        //hack IE
        $("body,html").animate({scrollTop: top}, speed);
        return false;
    });

    circles.click(function (event) {
        /* Act on the event */
        var top = $($(this).attr('href')).offset().top;
        var speed = Math.abs(($("body,html").scrollTop() - top)) / 900 * 500;
        $("body,html").animate({scrollTop: top}, speed);
        //阻止链接跳转事件
        event.preventDefault();
    });

    /******************************************************
     项目mouseover事件
     *******************************************************/
    var img = $('#three img');
    $('#three ul li').mouseover(function (event) {
        /* Act on the event */
        var enterID = $(this).index();
        img.eq(enterID).addClass('active');
    });
    $('#three ul li').mouseout(function (event) {
        /* Act on the event */
        var enterID = $(this).index();
        img.eq(enterID).removeClass('active');
    });


    /******************************************************
     进度条事件
     *******************************************************/
    var timeOutID;
    $('.process').animate({right: "20%"}, 1000, function () {
        //为防止页面加载失败之后的不能看到页面的情况，10000mills认为加载失败
        timeOutID = setTimeout(showPage, 10000);
    });

    $(window).load(function () {
        /* Act on the event */
        //页面加载成功之后清除timeout，防止反复调用
        clearTimeout(timeOutID);
        showPage();
    });

    //********************显示主页面函数******************
    function showPage() {
        $('.process').animate({right: 0}, 200).promise().done(function () {
            $('.loading').hide();
            $('.wait h1').hide();
            $('.slideUp').animate({height: 0}, 1000, function () {
                /* stuff to do after animation is complete */
                $('.wait').hide();
                $(document.body).css('overflow', 'auto');
            });

            $('.slideDown').animate({height: 0}, 1000, function () {
                /* stuff to do after animation is complete */
                $('.wait').hide();
                $(document.body).css('overflow', 'auto');
            });
        });
    }

});