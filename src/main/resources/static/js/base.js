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
        $.removeCookie("userId");
        sessionStorage.clear();
        location.href = "http://localhost:8080";
        return false;
    });
    // 渲染头部和右侧导航栏
    var myStuff =
        '<div class="myStuffTab_top">' +
        '<div class="myStuffTab_top_l"><img src="{{userAvatar}}" alt=""></div>' +
        '<div class="myStuffTab_top_r">' +
        '<div>{{userAccount}}</div>' +
        '<div>普通会员</div>' +
        '</div>' +
        '</div>' +
        '<div class="myStuffTab_middle">' +
        '<div>' +
        '<div>姓名</div>' +
        '<div>{{userName}}</div>' +
        '</div>' +
        '</div>' +
        '<div class="myStuffTab_middle">' +
        '<div>' +
        '<div>邮箱</div>' +
        '<div>{{userEmail}}</div>' +
        '</div>' +
        '</div>' +
        '<div class="myStuffTab_middle">' +
        '<div>' +
        '<div>手机</div>' +
        '<div>{{userPhone}}</div>' +
        '</div>' +
        '</div>' +
        '<div class="myStuffTab_bottom">退出登录</div>';

    var userAccoutData =
        '<a href="http://localhost:8080/userinfo"><i class="iconfont icon-huiyuan">{{userAccount}}</i></a>';
    var myCart =
        '{{each shoppingCart}}' +
        '<div class="hasCartThings_top">' +
        '<div class="cartThing">' +
        '<img src="image/111.jpg" class="cartThingImg">' +
        '<div class="cartThingTitle">8成新 新概念摄像机 高清专业数码摄像机</div>' +
        '<div class="cartThingPrice">￥11099</div>' +
        '<div class="cartThingNumber">x1</div>' +
        '<div class="cartThingDelete">删除</div>' +
        '</div>' +
        '</div>' +
        '{{/each}}' +
        '<div class="hasCartThings_bottom">去购物车结算</div>';
    if ($.cookie("userId") != undefined) {
        $.post("http://localhost:8080/user/getUserBasicInfo", {userId: $.cookie("userId")}, function (res) {
            console.log(res);
            var render = template.compile(myStuff);
            var html = render(res.userBasicInfo);
            $(".myStuffTab").html(html);
            var userAccountRender = template.compile(userAccoutData);
            var userAccountHtml = userAccountRender(res.userBasicInfo);
            $(".userAccount").html(userAccountHtml);
            if (res.shoppingCart == "") {
                $(".hasNoCartThings").stop().show().sibling().stop().hide();
            }
            else {
                $(".hasCartThings").stop().show().sibling().stop().hide();
                var userCartRender = template.compile(myCart);
                var userCartHtml = userCartRender(res.shoppingCart);
                $(".hasCartThings").html(userCartHtml);
                sessionStorage.setItem("shoppingCart", JSON.stringify(res.shoppingCart));
            }
            $.cookie("userAccount", res.userBasicInfo.userAccount);
            $.cookie("userName", res.userBasicInfo.userName);
            $.cookie("userPhone", res.userBasicInfo.userPhone);
            $.cookie("userEmail", res.userBasicInfo.userEmail);
            localStorage.setItem("userAvatar", res.userBasicInfo.userAvatar);
            // $.cookie("userAvatar",res.userAvatar);
            $(".myStuffTab_top").on('click', function () {
                location.href = "http://localhost:8080/userinfo";
            });
        });
    }
    if ($.cookie("userId") != undefined) {
        $(".shortcut").children().eq(1).css("display", "block").siblings().css("display", "none");
        $(".afterLogin").css("display", "block").siblings(".rightBar").css("display", "none");
    }
    else {
        $(".shortcut").children().eq(0).css("display", "block").siblings().css("display", "none");
        $(".rightBar").css("display", "block").siblings(".afterLogin").css("display", "none");
    }

    $(".shortcut>div").eq(0).children(".fr").children("li").eq(4).on("click", function () {
        if ($.cookie("userId") === undefined) {
            alert("请先登录");
            location.href = "http://localhost:8080/login";
            return false;
        }
    })
});