// 订单结算页面
$(function () {
    var data =
        '<div class="shoppingListTitle">购物清单</div>' +
        '<div class="shoppingListHandler">' +
        '<div class="shoppingListHandlerTitle">' +
        '<table>' +
        '<tr>' +
        '<td>名称</td>' +
        '<td>价格</td>' +
        '<td>数量</td>' +
        '<td>小计</td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '{{each}}' +
        '<div class="shoppingListHandlerDes">' +
        '<div class="shoppingListHandlerDesList">' +
        '<table>' +
        '<tr>' +
        '<td>' +
        '<img src="{{$value.commodityPicture}}" alt="">' +
        '<span>{{$value.commodityTitle}}</span>' +
        '</td>' +
        '<td>￥{{$value.commodityPrice}}.00</td>' +
        '<td>{{$value.amount}}</td>' +
        '<td>￥{{$value.totalPrice}}.00</td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '{{/each}}' +
        '<div class="messageBoard">' +
        '<div>给卖家留言</div>' +
        '<div>' +
        '<input type="text" maxlength="200" placeholder="选填：对本次交易的说明（建议填写和卖家达成一致的说明）">' +
        '</div>' +
        '<div>(200字)</div>' +
        '</div>' +
        '</div>';
    var data2 =
        '<div>商品总额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥{{totalPrice}}.00</div>' +
        '<div>运费：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥5.00</div>' +
        '<div>应付总金额：<span>￥{{finalPrice}}.00</span></div>' +
        '<div class="submitOrder" id="submitOrder"><span>提交订单</span></div>';
    var data3 = '{{each receiverInfo as value}}' +
        '<div class="showConsigneeM" addressId = "{{value.addressId}}">' +
        '<div class="showConsigneeMPic"></div>' +
        '<div class="showConsigneeMName">' +
        '<i></i>' +
        '<span>{{value.receiverName}}</span>' +
        '</div>' +
        '<div class="showConsigneeMTel">' +
        '<i></i>' +
        '<span>{{value.receiverPhone}}</span>' +
        '</div>' +
        '<div class="showConsigneeMPlace">' +
        '<i></i>' +
        '<span>{{value.location}}</span>' +
        '</div>' +
        '<div class="showConsigneeMIcon">' +
        '<i></i>' +
        '</div>' +
        '<div class="dealAddrHandler">' +
        '<div class="delAddrBtn"></div>' +
        '<div class="editAddrBtn"></div>' +
        '</div>' +
        '</div>' +
        '{{/each}}' +
        '<div class="addConsigneeM" id="addConsigneeM">' +
        '<div class="addAddrMsg"></div>' +
        '<div class="addAddr">添加信息</div>' +
        '</div>';
    $.ajax({
        url: "http://localhost:8080/order/show",
        type: "get",
        data: {
            "userId": $.cookie("userId"),
            "orderId": sessionStorage.getItem("orderId")
        },
        success: function (res) {
            console.log(res);
            var fakeOrderId = res.orderId;
            var totalPrice = 0;
            res.orderInfo.forEach(function (data) {
                totalPrice += data.totalPrice;
            });
            res.orderInfo.totalPrice = totalPrice;
            res.orderInfo.finalPrice = totalPrice + 5;
            var orderAmount = res.orderInfo.finalPrice;
            var render = template.compile(data);
            var html = render(res.orderInfo);
            $(".shoppingList").html(html);
            var renders = template.compile(data2);
            var html1 = renders(res.orderInfo);
            $(".mstlTotalWarp").html(html1);
            if (res.receiverInfo.length == 0) {
                $(".addConsigneeM").stop().show();
            } else {
                var renderss = template.compile(data3);
                var html2 = renderss(res);
                $(".addConsignee").html(html2);
            }
            // 点击收货人信息改变边框颜色
            $(".showConsigneeM").on("click", function () {
                $(this).addClass("addBorder").siblings(".showConsigneeM").removeClass("addBorder");
            });
            // 鼠标移入显示修改和删除按钮
            $(".showConsigneeM").on("mouseenter", function () {
                $(this).children(".dealAddrHandler").stop().animate({"top": "0"}, 400);
            });
            $(".showConsigneeM").on("mouseleave", function () {
                $(this).children(".dealAddrHandler").stop().animate({"top": "-40px"}, 400);
            });
            //删除收货人信息
            $(".delAddrBtn").on("click", function () {
                $.post("http://localhost:8080/order/delete", {"addressId": $(this).parent().parent().attr("addressId")});
                if ($(".showConsigneeM").length == 1) {
                    $(this).parent().parent().stop().hide();
                } else {
                    $(this).parent().parent().remove();
                }
            });
            //修改收货人信息
            var flag = true;
            $(".editAddrBtn").on("click", function () {
                flag = false;
                var that = this;
                $(".barrier").stop().show();
                $(".changeInformation").stop().show();
                var name = $(this).parent().siblings(".showConsigneeMName").children("span").html();
                var tel = $(this).parent().siblings(".showConsigneeMTel").children("span").html();
                var address = $(this).parent().siblings(".showConsigneeMPlace").children("span").html();
                $("#changeInformationDes_name_t").val(name);
                $("#changeInformationDes_address").val(address);
                $("#changeInformationDes_tel").val(tel);
                $("#changeInformationBtnOk").off("click");
                $("#changeInformationBtnOk").on("click", function () {
                    var name1 = $("#changeInformationDes_name_t").val();
                    var address1 = $("#changeInformationDes_address").val();
                    var tel1 = $("#changeInformationDes_tel").val();
                    $(this).parent().siblings(".showConsigneeMName").children("span").html(name1);
                    $(this).parent().siblings(".showConsigneeMPlace").children("span").html(address1);
                    $(this).parent().siblings(".showConsigneeMTel").children("span").html(tel1);
                    $("#changeInformationDes_name_t").val("");
                    $("#changeInformationDes_address").val("");
                    $("#changeInformationDes_tel").val("");
                    $(".barrier").stop().hide();
                    $(".changeInformation").stop().hide();
                    $("#changeInformationBtnOk").off("click");
                    flag = true;
                    var addressInfo = {
                        "addressId": $(this).parent().parent().attr("addressId"),
                        "receiverName": name1,
                        "location": address1,
                        "receiverPhone": tel1
                    };
                    $.ajax({
                        url: "http://localhost:8080/order/update",
                        type: "post",
                        contentType: "application/json;charset=UTF-8",
                        data: JSON.stringify(addressInfo)
                    });
                }.bind(that));
            });
            // 添加收货人信息
            $("#addConsigneeM").on("click", function () {
                $(".barrier").stop().show();
                $(".changeInformation").stop().show();
                $("#changeInformationDes_name_t").val("");
                $("#changeInformationDes_address").val("");
                $("#changeInformationDes_tel").val("");
                $("#changeInformationBtnOk").on("click", function () {
                    if (flag == true) {
                        var name = $("#changeInformationDes_name_t").val();
                        var address = $("#changeInformationDes_address").val();
                        var tel = $("#changeInformationDes_tel").val();
                        var newReceiverInfo = {
                            "userId": $.cookie("userId"),
                            "receiverName": name,
                            "location": address,
                            "receiverPhone": tel
                        };
                        if (name != "" && address != "" && tel != "") {
                            $.ajax({
                                url: "http://localhost:8080/order/insert",
                                type: "post",
                                contentType: "application/json;charset=UTF-8",
                                data: JSON.stringify(newReceiverInfo),
                                success: function (res) {
                                    var newInformation = $(".addConsignee").children().eq(0).clone(true);
                                    newInformation.removeClass("addBorder");
                                    newInformation.children(".showConsigneeMName").children("span").html(name);
                                    newInformation.children(".showConsigneeMPlace").children("span").html(address);
                                    newInformation.children(".showConsigneeMTel").children("span").html(tel);
                                    newInformation.attr("addressId", res.receiverInfo[res.receiverInfo.length - 1].addressId);
                                    newInformation.stop().show();
                                    newInformation.insertBefore($("#addConsigneeM"));
                                }
                            });
                        } else {
                            alert("请填写完整的信息");
                            return false;
                        }
                        $(".barrier").stop().hide();
                        $(".changeInformation").stop().hide();
                        $("#changeInformationBtnOk").off("click");
                    }
                });
            });
            // 关闭添加收货人信息
            $("#closeChangeInformation,#changeInformationBtnCancle").on("click", function () {
                $(".barrier").stop().hide();
                $(".changeInformation").stop().hide();
            });
            //提交订单
            $("#submitOrder>span").on("click", function () {
                var addressId = $(".addConsignee").children(".addBorder").attr("addressid");
                if ($(".addConsignee").children(".addBorder").length != 0) {
                    var orderCheck = {
                        "orderId": fakeOrderId,
                        "userId": $.cookie("userId"),
                        "addressId": addressId,
                        "commodityId": sessionStorage.getItem("commodityId"),
                        "amount": sessionStorage.getItem("thingsNumber"),
                        "orderAmount": orderAmount
                    };
                    $.ajax({
                        url: "http://localhost:8080/order/pay",
                        type: "post",
                        contentType: "application/json;charset=UTF-8",
                        data: JSON.stringify(orderCheck),
                        success: function (res) {
                            if (res == "订单已提交,请勿重复提交订单") {
                                alert("订单已提交,请勿重复提交订单");
                                location.href = "http://localhost:8080/commodity";
                            } else if (res == "订单提交失败") {
                                alert("订单提交失败，已退回购物车");
                                location.href = "http://localhost:8080/shoppingcart";
                            } else {
                                sessionStorage.setItem("orderId", fakeOrderId);
                                location.href = "http://localhost:8080/status";
                            }
                        }
                    });
                } else {
                    alert("请选择收货地址");
                    return false;
                }
            });
        }
    });
});
