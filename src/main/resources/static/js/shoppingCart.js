// 购物车页面
$(function () {
    $(".shoppingCar").css("pointerEvents", "none");
    var cart =
        '<div class="hasThingsT">' +
        '<div class="hasThingsTTitle">' +
        '<table>' +
        '<tr>' +
        '<td class="itemName">名称</td>' +
        '<td class="itemPrice">价格</td>' +
        '<td class="itemAmount">数量</td>' +
        '<td class="itemTotal">小计</td>' +
        '<td class="itemOpt">操作</td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '{{each}}' +
        '<div class="activity">' +
        '<div class="manjian">满减</div>' +
        '<div class="manjianTitle">产品参与单品“满100减9”的促销活动。</div>' +
        '<div class="subtotal">' +
        '<div>￥{{$value.discountPrice}}.00</div>' +
        '<div>￥{{$value.totalPrice}}.00</div>' +
        '</div>' +
        '</div>' +
        '<div class="itemList" commodityId = "{{$value.commodityId}}">' +
        '<table>' +
        '<tr>' +
        '<td class="itemListCheck">' +
        '<label class="imgCheck"></label>' +
        '</td>' +
        '<td class="itemListTitle">' +
        '<a href="#" title="{{$value.commodityTitle}}">{{$value.commodityTitle}}</a>' +
        '</td>' +
        '<td class="itemListPrice">￥{{$value.commodityPrice}}.00</td>' +
        '<td class="itemListNumber">' +
        '<input type="text" value="{{$value.amount}}">' +
        '<span class="up"></span>' +
        '<span class="down"></span>' +
        '</td>' +
        '<td class="itemListTitleSubtotal">￥{{$value.totalPrice}}.00</td>' +
        '<td class="itemListTitleOperation">' +
        '<span></span>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '{{/each}}' +
        '</div>' +
        '<div class="hasThingsB">' +
        '<div class="selectAll">' +
        '<label class="imgCheck" id="checkAll"></label>' +
        '<span>全选</span>' +
        '<span>商品总金额：</span>' +
        '<span>￥22198.00</span>' +
        '</div>' +
        '<div class="discountAmount">' +
        '<span>优惠金额：</span>' +
        '<span>￥9.00</span>' +
        '</div>' +
        '<div class="payMoney">' +
        '<span>应付金额：</span>' +
        '<span>￥22189.00</span>' +
        '</div>' +
        '<div class="continueShopping">' +
        '<a href="index.html">继续购物</a>' +
        '<div class="payOrder" id="payOrder">结算订单</div>' +
        '</div>' +
        '</div>';
    $.ajax({
        url: "http://localhost:8080/cart/get",
        type: "post",
        data: {"userId": $.cookie("userId")},
        success: function (res) {
            if (res.length == 0) {
                $(".noThings").stop().show().siblings().stop().hide();
            } else {
                $(".hasThings").stop().show().siblings().stop().hide();
                var thingsPrice = 0;
                var discountPrice = res.length * 9;
                res.forEach(function (data) {
                    data.totalPrice = data.commodityPrice * data.amount;
                    data.discountPrice = data.totalPrice - 9;
                    thingsPrice += data.totalPrice;
                });
                var thingsDiscountPrice = thingsPrice - discountPrice;
                var render = template.compile(cart);
                var html = render(res);
                $(".hasThings").html(html);
                $(".selectAll").children("span").eq(2).html('￥' + thingsPrice + '.00');
                $(".discountAmount").children("span").eq(1).html('￥' + discountPrice + '.00');
                $(".payMoney").children("span").eq(1).html('￥' + thingsDiscountPrice + '.00');
                notClickchangeShoppingNumber($(".itemListNumber>input"), 50);
                $(".up").on("click", function () {
                    clickchangeShoppingNumber($(this), $(this).siblings("input"), 50);
                });
                $(".down").on("click", function () {
                    clickchangeShoppingNumber($(this), $(this).siblings("input"), 50);
                });

                $(".itemListNumber>input").on("keyup", function () {
                    notClickchangeShoppingNumber($(this), 50);
                });

                // 全选和全不选
                $("#checkAll").on("click", function () {
                    $(this).toggleClass("imgCheck");
                    if ($(this).hasClass("imgCheck")) {
                        $(".itemListCheck>label").addClass("imgCheck");
                        $(".itemListCheck>label").parent().parent().parent().parent().parent().prev(".activity").children(".manjian").css("backgroundColor", "#ff4a00");
                    } else {
                        $(".itemListCheck>label").removeClass("imgCheck");
                        $(".itemListCheck>label").parent().parent().parent().parent().parent().prev(".activity").children(".manjian").css("backgroundColor", "#e2e2e2");
                    }
                    if ($(this).hasClass("imgCheck")) {
                        $(".itemList").each(function (index, data) {
                            var value = $(data).find(".itemListNumber").children("input").val();
                            var prices = $(data).find(".itemListPrice").html();
                            prices = prices.substr(1, 4);
                            thingsPrice += prices * value;
                        });
                        discountPrice = $(".itemList").length * 9;
                        thingsDiscountPrice = thingsPrice - discountPrice;
                        $(".selectAll").children("span").eq(2).html('￥' + thingsPrice + '.00');
                        $(".discountAmount").children("span").eq(1).html('￥' + discountPrice + '.00');
                        $(".payMoney").children("span").eq(1).html('￥' + thingsDiscountPrice + '.00');
                    } else {
                        thingsPrice = 0;
                        discountPrice = 0;
                        thingsDiscountPrice = 0;
                        $(".selectAll").children("span").eq(2).html('￥' + thingsPrice + '.00');
                        $(".discountAmount").children("span").eq(1).html('￥' + discountPrice + '.00');
                        $(".payMoney").children("span").eq(1).html('￥' + thingsDiscountPrice + '.00');
                    }
                });

                $(".itemListCheck>label").on("click", function () {
                    var flag = true;
                    var id = $(this).parents(".itemList").attr("commodityid");
                    var tP = $(this).parent().next();
                    var tP1 = $(this).parents(".itemList").prev().children(".subtotal");
                    $(this).toggleClass("imgCheck");
                    for (var i = 0; i < $(".itemListCheck>label").length; i++) {
                        if (!$(".itemListCheck>label").eq(i).hasClass("imgCheck")) {
                            $(".itemListCheck>label").eq(i).parent().parent().parent().parent().parent().prev(".activity").children(".manjian").css("backgroundColor", "#e2e2e2");
                            flag = false;
                        } else {
                            $(".itemListCheck>label").eq(i).parent().parent().parent().parent().parent().prev(".activity").children(".manjian").css("backgroundColor", "#ff4a00");
                        }
                    }
                    if (flag == false) {
                        $("#checkAll").removeClass("imgCheck");
                    } else {
                        $("#checkAll").addClass("imgCheck");
                    }
                    if ($(this).hasClass("imgCheck")) {
                        window.thingsNumber = $(this).parent().siblings(".itemListNumber").children("input").val();
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].commodityId == id) {
                                thingsPrice += res[i].commodityPrice * window.thingsNumber;
                                discountPrice += 9;
                                thingsDiscountPrice = thingsPrice - discountPrice;
                                $(".selectAll").children("span").eq(2).html('￥' + thingsPrice + '.00');
                                $(".discountAmount").children("span").eq(1).html('￥' + discountPrice + '.00');
                                $(".payMoney").children("span").eq(1).html('￥' + thingsDiscountPrice + '.00');
                                break;
                            }
                        }
                    } else {
                        window.thingsNumber = $(this).parent().siblings(".itemListNumber").children("input").val();
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].commodityId == id) {
                                thingsPrice -= res[i].commodityPrice * window.thingsNumber;
                                discountPrice -= 9;
                                thingsDiscountPrice = thingsPrice - discountPrice;
                                $(".selectAll").children("span").eq(2).html('￥' + thingsPrice + '.00');
                                $(".discountAmount").children("span").eq(1).html('￥' + discountPrice + '.00');
                                $(".payMoney").children("span").eq(1).html('￥' + thingsDiscountPrice + '.00');
                                break;
                            }
                        }
                    }
                });
                //删除购物车订单
                var number = res.length;
                $(".itemListTitleOperation>span").on("click", function () {
                    var obj = $(this).parents(".itemList");
                    obj.prev(".activity").remove();
                    number--;
                    obj.remove();
                    $(".shoppingCar>span").html(number);
                    if ($(".hasThings").children(".hasThingsT").children().length == 1) {
                        $(".noThings").stop().show().siblings().hide();
                    } else {
                        $(".hasThings").stop().show().siblings().hide();
                    }
                    $.ajax({
                        url: "http://localhost:8080/cart/delete",
                        type: "post",
                        data: {"userId": $.cookie("userId"), "commodityId": obj.attr("commodityid")},
                    });
                });
                //结算订单
                $("#payOrder").on("click", function () {
                    var cartArr = [];
                    var cartObj = {};
                    sessionStorage.setItem("flag", "1");
                    $(".itemList").each(function (index, data) {
                        if ($(data).find(".itemListCheck").children().hasClass("imgCheck")) {
                            cartObj.userId = $.cookie("userId");
                            cartObj.commodityId = $(data).attr("commodityid");
                            cartObj.amount = $(data).find(".itemListNumber").children("input").val();
                            cartArr.push(cartObj);
                            cartObj = {};
                        }
                    });
                    console.log(cartArr);
                    if (cartArr.length == 0) {
                        alert("请选择您的商品");
                    } else {
                        $.ajax({
                            url: "http://localhost:8080/order/buyCommodities",
                            type: "post",
                            data: JSON.stringify(cartArr),
                            contentType: 'application/json;charset=utf-8',
                            success: function (res) {
                                sessionStorage.setItem("orderId", res);
                                location.href = "http://localhost:8080/order";
                            }
                        });
                    }
                });

                //改变商品数量的函数封装
                function clickchangeShoppingNumber(clickElement, changeElement, maxValue) {
                    window.thingsNumber = changeElement.val();
                    var id = changeElement.parents(".itemList").attr("commodityid");
                    var tP = changeElement.parent().next();
                    var tP1 = changeElement.parents(".itemList").prev().children(".subtotal");
                    if (clickElement.attr("class") == "up") {
                        thingsNumber++;
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].commodityId == id) {
                                tP.html('￥' + res[i].commodityPrice * thingsNumber + '.00');
                                tP1.children().eq(0).html('￥' + (res[i].commodityPrice * thingsNumber - 9) + '.00');
                                tP1.children().eq(1).html('￥' + res[i].commodityPrice * thingsNumber + '.00');
                                if (changeElement.parent().prev().prev().prev().children().hasClass("imgCheck")) {
                                    thingsPrice += res[i].commodityPrice;
                                    thingsDiscountPrice += res[i].commodityPrice;
                                    $(".selectAll").children("span").eq(2).html('￥' + thingsPrice + '.00');
                                    $(".payMoney").children("span").eq(1).html('￥' + thingsDiscountPrice + '.00');
                                }
                                break;
                            }
                        }
                    } else {
                        thingsNumber--;
                        if (thingsNumber != 0) {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].commodityId == id) {
                                    tP.html('￥' + res[i].commodityPrice * thingsNumber + '.00');
                                    tP1.children().eq(0).html('￥' + (res[i].commodityPrice * thingsNumber - 9) + '.00');
                                    tP1.children().eq(1).html('￥' + res[i].commodityPrice * thingsNumber + '.00');
                                    if (changeElement.parent().prev().prev().prev().children().hasClass("imgCheck")) {
                                        thingsPrice -= res[i].commodityPrice;
                                        thingsDiscountPrice -= res[i].commodityPrice;
                                        $(".selectAll").children("span").eq(2).html('￥' + thingsPrice + '.00');
                                        $(".payMoney").children("span").eq(1).html('￥' + thingsDiscountPrice + '.00');
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (thingsNumber <= 1) {
                        thingsNumber = 1;
                        clickElement.parent().children(".up").css("backgroundPosition", "-625px -974px");
                        clickElement.parent().children(".down").css("backgroundPosition", "-591px -1005px");
                    } else if (thingsNumber >= maxValue) {
                        thingsNumber = maxValue;
                        clickElement.parent().children(".up").css("backgroundPosition", "-591px -974px");
                        clickElement.parent().children(".down").css("backgroundPosition", "-625px -1005px");
                    } else {
                        clickElement.parent().children(".down").css("backgroundPosition", "-625px -1005px");
                        clickElement.parent().children(".up").css("backgroundPosition", "-625px -974px");
                    }
                    changeElement.val(thingsNumber);
                }

                function notClickchangeShoppingNumber(changeElement, maxValue) {
                    var thingsNumber = changeElement.val();
                    if (thingsNumber <= 1) {
                        $(".up").css("backgroundPosition", "-625px -974px");
                        $(".down").css("backgroundPosition", "-591px -1005px");
                    } else if (thingsNumber >= maxValue) {
                        $(".up").css("backgroundPosition", "-591px -974px");
                        $(".down").css("backgroundPosition", "-625px -1005px");
                    } else {
                        $(".down").css("backgroundPosition", "-625px -1005px");
                        $(".up").css("backgroundPosition", "-625px -974px");
                    }
                }
            }
        }
    });
});
