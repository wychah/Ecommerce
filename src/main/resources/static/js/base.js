$(function () {
    // 固定导航栏
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".shortcut").addClass("fixed");
            $(".header").css("marginTop", $(".shortcut").height());
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
        $(document).on("mousemove", function (e) {
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
        if ($(this).children("div").eq(1).css("display") == "none") {
            $(this).children("div").eq(1).stop().show();
            $(this).siblings().children("div").each(function (index, elements) {
                if ($(elements).hasClass("landingBoox")) {
                    $(elements).stop().hide();
                }
            });
        } else if ($(this).children("div").eq(1).css("display") == "block") {
            $(this).children("div").eq(1).stop().hide();
        }
    });
    $(".shortcut>.w1>.fr a").on("click", function () {
        alert("请先登录");
        location.href = "http://localhost:8080/login";
        return false;
    });
    //登录后右边菜单栏
    $(".fk-rbar-plugins").on("click", function (e) {
        e.stopPropagation();
    });
    $(".fk-rbar-tabs>i").on("click", function (e) {
        var index = $(this).index();
        if ($(".fk-rbar-plugins>div").eq(index).css("opacity") == 1 && $(".afterLogin").css("right") == "0px") {
            $(".afterLogin").stop().animate({right: -255});
        }
        if ($(".afterLogin").css("right") == "-255px") {
            $(".afterLogin").stop().animate({right: 0});
        }
        $(".fk-rbar-plugins>div").eq(index).stop().animate({width: 255, height: 710, opacity: 1}, 400
        ).siblings().stop().animate({width: 0, height: 0, opacity: 0}, 500);
        e.stopPropagation();
    });
    $(document).on("click", function () {
        if ($(".afterLogin").css("right") == "0px") {
            $(".afterLogin").stop().animate({right: -255});
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
        '<div class="cartThing" commodityId = "{{$value.commodityId}}">' +
        '<img src="{{$value.commodityPicture}}" class="cartThingImg">' +
        '<div class="cartThingTitle">{{$value.commodityTitle}}</div>' +
        '<div class="cartThingPrice">￥{{$value.commodityPrice}}</div>' +
        '<div class="cartThingNumber">x{{$value.amount}}</div>' +
        '<div class="cartThingDelete">删除</div>' +
        '</div>' +
        '</div>' +
        '{{/each}}' +
        '<div class="hasCartThings_bottom">去购物车结算</div>';
    if ($.cookie("userId") != undefined) {
        $.post("http://localhost:8080/user/getUserBasicInfo", {userId: $.cookie("userId")}, function (res) {
            var render = template.compile(myStuff);
            var html = render(res.userBasicInfo);
            $(".myStuffTab").html(html);
            var userAccountRender = template.compile(userAccoutData);
            var userAccountHtml = userAccountRender(res.userBasicInfo);
            $(".userAccount").html(userAccountHtml);
            $(".shoppingCar").children("span").text(res.shoppingCart.length);
            if (res.shoppingCart == "") {
                $(".hasNoCartThings").stop().show().siblings().stop().hide();
            } else {
                $(".hasCartThings").stop().show().siblings().stop().hide();
                if (sessionStorage.getItem("shoppingCart") == undefined || sessionStorage.getItem("shoppingCart") == "[]") {
                    var userCartRender = template.compile(myCart);
                    var userCartHtml = userCartRender(res);
                    $(".hasCartThings").html(userCartHtml);
                    sessionStorage.setItem("shoppingCart", JSON.stringify(res.shoppingCart));
                } else {
                    var myCartA =
                        '{{each}}' +
                        '<div class="hasCartThings_top">' +
                        '<div class="cartThing" commodityId = "{{$value.commodityId}}">' +
                        '<img src="{{$value.commodityPicture}}" class="cartThingImg">' +
                        '<div class="cartThingTitle">{{$value.commodityTitle}}</div>' +
                        '<div class="cartThingPrice">￥{{$value.commodityPrice}}</div>' +
                        '<div class="cartThingNumber">x{{$value.amount}}</div>' +
                        '<div class="cartThingDelete">删除</div>' +
                        '</div>' +
                        '</div>' +
                        '{{/each}}' +
                        '<div class="hasCartThings_bottom">去购物车结算</div>';
                    var userCartRender = template.compile(myCartA);
                    var userCartHtml = userCartRender(JSON.parse(sessionStorage.getItem("shoppingCart")));
                    $(".hasCartThings").html(userCartHtml);
                }
            }
            $.cookie("userAccount", res.userBasicInfo.userAccount);
            $.cookie("userName", res.userBasicInfo.userName);
            $.cookie("userPhone", res.userBasicInfo.userPhone);
            $.cookie("userEmail", res.userBasicInfo.userEmail);
            localStorage.setItem("userAvatar", res.userBasicInfo.userAvatar);
            $(".cartThingDelete").on('click', function (e) {
                var currentShoppingId = $(this).parent().attr("commodityId");
                $(this).parent().parent().remove();
                $.ajax({
                    url: "http://localhost:8080/cart/delete",
                    type: "post",
                    data: {"userId": $.cookie("userId"), "commodityId": currentShoppingId},
                    success: function (res) {
                        $(".shoppingCar").children("span").html(res.length);
                        sessionStorage.setItem("shoppingCart", JSON.stringify(res));
                        if (sessionStorage.getItem("shoppingCart") == "[]") {
                            $(".hasNoCartThings").stop().show().siblings().stop().hide();
                        }
                    }
                });
                e.stopPropagation();
            });
            $(".hasCartThings_bottom").on('click', function (e) {
                location.href = "http://localhost:8080/shoppingcart";
                e.stopPropagation();
            });
            $(".myStuffTab_top").on('click', function (e) {
                location.href = "http://localhost:8080/userinfo";
                e.stopPropagation();
            });
        });
    }
    if ($.cookie("userId") != undefined) {
        $(".shortcut").children().eq(1).css("display", "block").siblings().css("display", "none");
        $(".afterLogin").css("display", "block").siblings(".rightBar").css("display", "none");
    } else {
        $(".shortcut").children().eq(0).css("display", "block").siblings().css("display", "none");
        $(".rightBar").css("display", "block").siblings(".afterLogin").css("display", "none");
    }
});