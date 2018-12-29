$(function () {
    var arr =
        '<table>' +
        '<tr>' +
        '<td>{{attributeName}}</td>' +
        '<td>{{attributeValue}}</td>' +
        '<td></td>' +
        '<td></td>' +
        '</tr>' +
        '</table>';

    var sdes =
        '<div class="smallImg">' +
        '<span class="slider"></span>' +
        '<img src="{{commodityPicture}}" alt="">' +
        '</div>' +
        '<div class="shoppingDes">' +
        '<div class="shoppingDesName">{{commodityTitle}}</div>' +
        '<div class="shoppingDesPrice">' +
        '<span>价格：</span>' +
        '<span>￥</span>' +
        '<span>{{commodityPrice}}.00</span>' +
        '</div>' +
        '<div class="shoppingDesNumber">' +
        '<span>购买数量：</span>' +
        '<input type="text" id="thingsNumber" value="1">' +
        '<span id="up"></span>' +
        ' <span id="down"></span>' +
        '<span>库存量:{{commodityInventory}}</span>' +
        '</div>' +
        '<div class="buyThings"><i class="iconfont icon-icon1"></i>加入购物车</div>' +
        '<div class="getInToCart" id="getInToCart">立即购买</div>' +
        '</div>' +
        '<div class="bigImg"><img src="{{commodityPicture}}" alt=""></div>';
    $.get("http://localhost:8080/commodity/detail", {"commodityId": sessionStorage.getItem("commodityId")}, function (res) {
        var render = template.compile(arr);
        var html = render(res.commodities);
        $(".body_bottom_des").html(html);
        var renders = template.compile(sdes);
        var htmls = renders(res.commodities);
        $(".body_top").html(htmls);
        var smallPic = $(".smallImg");
        // 获取大图容器
        var bigPic = $(".bigImg");
        // 获取滑块
        var slider = $(".slider");
        // 获取大图
        var bigImg = $(".bigImg>img");
        //移出
        smallPic.on("mouseleave", function () {
            slider.stop().hide();
            bigPic.stop().hide();
        });
        // 移入
        smallPic.on("mousemove", function (e) {
            slider.stop().show();
            bigPic.stop().show();
            var left = e.clientX - slider.width() / 2;
            // console.log(left);
            var top = e.clientY - slider.height() / 2;
            // console.log(slider.width());
            // 最大移动距离
            var x = left - 210;
            var y = top - 130;
            x = x < 0 ? 0 : x;
            x = x > smallPic.width() - slider.width() ? smallPic.width() - slider.width() : x;
            y = y < 0 ? 0 : y;
            y = y > smallPic.height() - slider.height() ? smallPic.height() - slider.height() : y;
            var percentX = (smallPic.width() - slider.width()) / (bigImg.width() - bigPic.width());
            var percentY = (smallPic.height() - slider.height()) / (bigImg.height() - bigPic.height());
            slider.css("left", x);
            slider.css("top", y);
            bigImg.css("marginLeft", -(x / percentX));
            bigImg.css("marginTop", -(y / percentY));
        });
        // 增加减少商品数
        $("#up").on("click", function () {
            clickchangeShoppingNumber($("#up"), $("#thingsNumber"), res.commodities.commodityInventory);
        });
        $("#down").on("click", function () {
            clickchangeShoppingNumber($("#down"), $("#thingsNumber"), res.commodities.commodityInventory);
        });
        $("#thingsNumber").on("keyup", function () {
            notClickchangeShoppingNumber($(this), res.commodities.commodityInventory);
        });
        //显示遮挡层和显示成功
        $(".buyThings").on("click", function () {
            if ($.cookie("userId") == undefined) {
                sessionStorage.setItem("lastPage", "http://localhost:8080/commodity");
                alert("请登录");
                location.href = "http://localhost:8080/login";
            } else {
                var thingsNumber = $("#thingsNumber").val();
                $.ajax({
                    url: "http://localhost:8080/commodity/check",
                    type: "post",
                    data: {
                        "commodityId": sessionStorage.getItem("commodityId"),
                        "amount": thingsNumber
                    },
                    success: function (res) {
                        if (res == "库存不足") {
                            alert("库存不足");
                            location.reload();
                        } else {
                            $(".barrier").stop().show();
                            $(".successToAddCart").stop().show();
                            $.ajax({
                                url: "http://localhost:8080/cart/add",
                                type: "post",
                                data: {
                                    "userId": $.cookie("userId"),
                                    "amount": thingsNumber,
                                    "commodityId": sessionStorage.getItem("commodityId")
                                },
                                success: function (res) {
                                    console.log(res);
                                    var tPrice = 0;
                                    res.forEach(function (data, index) {
                                        tPrice += data.amount * data.commodityPrice;
                                    });
                                    var string = '购物车共有' + res.length + '件商品。合计：￥' + tPrice + '';
                                    $(".cartDes").html(string);
                                    sessionStorage.setItem("shoppingCart", JSON.stringify(res));
                                    $(".shoppingCar").children("span").html(res.length);
                                }
                            });
                        }
                    }
                });
            }
        });
        //去掉遮挡层和显示成功
        $(".successBtn>a,.successToAddCart>span").on("click", function () {
            $(".barrier").stop().hide();
            $(".successToAddCart").stop().hide();
            location.reload();
            return false;
        });
        //跳转到购物车
        $("#gotoCart").on("click", function () {
            location.href = "http://localhost:8080/shoppingcart";
        });
        //立即购买
        $("#getInToCart").on("click", function () {
            if ($.cookie("userId") == undefined) {
                sessionStorage.setItem("lastPage", "http://localhost:8080/commodity");
                alert("请登录");
                location.href = "http://localhost:8080/login";
            } else {
                var thingsNumber = $("#thingsNumber").val();
                $.ajax({
                    url: "http://localhost:8080/commodity/check",
                    type: "post",
                    data: {
                        "commodityId": sessionStorage.getItem("commodityId"),
                        "amount": thingsNumber
                    },
                    success: function (res) {
                        if (res == "库存不足") {
                            alert("库存不足");
                            location.reload();
                        } else {
                            sessionStorage.setItem("thingsNumber", thingsNumber);
                            location.href = "http://localhost:8080/order";
                        }
                    }
                });
            }
        });
    });

    //按钮点击调节商品数量
    function clickchangeShoppingNumber(clickElement, changeElement, maxValue) {
        var thingsNumber = changeElement.val();
        if (clickElement.attr("id") == "up") {
            thingsNumber++;
        } else {
            thingsNumber--;
        }
        if (thingsNumber <= 1) {
            thingsNumber = 1;
            $("#up").css("backgroundPosition", "-625px -974px");
            $("#down").css("backgroundPosition", "-591px -1005px");
        } else if (thingsNumber >= maxValue) {
            thingsNumber = maxValue;
            $("#up").css("backgroundPosition", "-591px -974px");
            $("#down").css("backgroundPosition", "-625px -1005px");
        } else {
            $("#down").css("backgroundPosition", "-625px -1005px");
            $("#up").css("backgroundPosition", "-625px -974px");
        }
        changeElement.val(thingsNumber);
    }

    // 不是按钮点击操作商品数量
    function notClickchangeShoppingNumber(changeElement, maxValue) {
        var thingsNumber = changeElement.val();
        if (thingsNumber <= 1) {
            $("#up").css("backgroundPosition", "-625px -974px");
            $("#down").css("backgroundPosition", "-591px -1005px");
        } else if (thingsNumber >= maxValue) {
            $("#up").css("backgroundPosition", "-591px -974px");
            $("#down").css("backgroundPosition", "-625px -1005px");
        } else {
            $("#down").css("backgroundPosition", "-625px -1005px");
            $("#up").css("backgroundPosition", "-625px -974px");
        }
    }
});

