$(function () {
    // 固定导航栏
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".shortcut").addClass("fixed");
            $(".header").css("marginTop", $(".shortcut").height());
            // console.log($(".main").css("marginTop"));
        } else {
            $(".shortcut").removeClass("fixed");
            $(".header").css("marginTop", "0");
        }
    });
    // 微信登录框移动
    $("#wechartLogion").on("click", function () {
        $(".barrierBed").show();
        $(".wechart").show();
    });
    $("#closeBtn").on("click", function () {
        $(".barrierBed").hide();
        $(".wechart").hide();
    });
    $(".loginTitle").on("mousedown", function (e) {
        var spacex = e.clientX - $(".wechart").offset().left;
        var spacey = e.clientY - $(".wechart").offset().top;
        // console.log(e.clientX);
        // console.log($(".wechart").offset().left);
        // console.log(spacex);
        $(document).on("mousemove", function (e) {
            console.log(spacex);
            $(".wechart").css("left", e.clientX - spacex + 190);
            $(".wechart").css("top", e.clientY - spacey + 225);
        });
    });
    $(document).on("mouseup", function () {
        $(this).off("mousemove");
    });
    // 懒加载图片
    $("img").lazyload();
    // 显示手机版二维码
    $("#phoneApp").on("mouseenter", function () {
        $(".trangle1").stop().show(500);
        $(".phoneApp").stop().slideDown();
    });
    $("#phoneApp").on("mouseleave", function () {
        $(".trangle1").stop().hide(500);
        $(".phoneApp").stop().slideUp();
    });
    //显示提示栏
    $("i").on("mouseenter", function () {
        $(this).children("div").eq(0).css({"display": "block"});
        $(this).children("div").eq(0).stop().animate({opacity: 1, left: -90});
    });
    $("i").on("mouseleave", function () {
        $(this).children("div").eq(0).css({"display": "none"});
        $(this).children("div").eq(0).stop().animate({opacity: 0, left: -108});
    });
    // 小火箭回到顶部
    $(window).scroll(function () {
        $(".toTop").on("click", function () {
            $(window).stop().scrollTop(0);
        });
    });
    // 显示快捷登陆框
    $("i").on("click", function () {
        // console.log($(this).children("div").eq(1).css("display"));
        if ($(this).children("div").eq(1).css("display") == "none") {
            // console.log($(this).children("div").eq(1).stop().show().parent().siblings().children("div").eq(1));
            $(this).children("div").eq(1).stop().show();
            $(this).siblings().children("div").each(function (index, elements) {
                // console.log($(elements));
                if ($(elements).hasClass("landingBoox")) {
                    $(elements).stop().hide();
                }
            });
            // $(this).siblings().children("div").eq(1).stop().hide();
        }
        else if ($(this).children("div").eq(1).css("display") == "block") {
            $(this).children("div").eq(1).stop().hide();
        }
    });
    //阻止事件冒泡
    $("i").children("div").on("click", function (e) {
        e.stopPropagation();
    });
    //登录后右边菜单栏
    $(".afterLogin").stop().animate({right: 0}, 1200, "linear");
    $(".afterLogin").on("click", function (e) {
        e.stopPropagation();
    });
    $(".fk-rbar-tabs>i").on("click", function (e) {
        var index = $(this).index();
        console.log($(".afterLogin").css("right"));
        if ($(".fk-rbar-plugins>div").eq(index).css("opacity") == 1 && $(".afterLogin").css("right") == "0px") {
            $(".afterLogin").stop().animate({right: -255});
        }
        if ($(".afterLogin").css("right") == "-255px") {
            $(".afterLogin").stop().animate({right: 0});
        }
        $(".fk-rbar-plugins>div").eq(index).css("zIndex", "200").siblings().css("zIndex", "199");
        $(".fk-rbar-plugins>div").eq(index).stop().animate({width: 255, height: 680, opacity: 1}, 400
        ).siblings().stop().animate({width: 0, height: 0, opacity: 0}, 500);
    });
    $(document).on("click", function () {
        $(".afterLogin").stop().animate({right: -255});
    });
    //登录后右边菜单栏
    $(".afterLogin").stop().animate({right: 0}, 1200, "linear");
    $(".afterLogin").on("click", function (e) {
        e.stopPropagation();
    });
    $(".fk-rbar-tabs>i").on("click", function (e) {
        var index = $(this).index();
        console.log($(".afterLogin").css("right"));
        if ($(".fk-rbar-plugins>div").eq(index).css("opacity") == 1 && $(".afterLogin").css("right") == "0px") {
            $(".afterLogin").stop().animate({right: -255});
        }
        if ($(".afterLogin").css("right") == "-255px") {
            $(".afterLogin").stop().animate({right: 0});
        }
        $(".fk-rbar-plugins>div").eq(index).stop().animate({width: 255, height: 710, opacity: 1}, 400
        ).siblings().stop().animate({width: 0, height: 0, opacity: 0}, 500);
    });
    $(document).on("click", function () {
        if ($(".afterLogin").css("right") == "0px") {
            $(".afterLogin").stop().animate({right: -255});
            return false;
        }
    });
    // 退出清楚数据
    $(".myStuffTab_bottom,.loginOut").on("click", function () {
        console.log("11");
        $.removeCookie("userId");
        sessionStorage.clear();
        location.href = "http://localhost:8080";
        return false;
    });
});