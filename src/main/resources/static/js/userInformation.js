// 用户资料
$(function () {
    $(".list-group-item").on("click", function () {
        var url = $(this).attr("href");
        $(this).parent().addClass("addBlBgc").siblings().removeClass("addBlBgc");
        $(".body_right").load(url + " .body_right>*", function () {
            if (url == "http://localhost:8080/userInformation") {
                $(".body_right_m").children("span").eq(1).children("span").text($.cookie("userAccount"));
                $(".imgHead").attr("src", localStorage.getItem("userAvatar"));
                $("#accountname").val($.cookie("userAccount"));
                $("#name").val($.cookie("userName"));
                if ($.cookie("userEmail") == "null") {
                    $("#userEmail").val("");
                } else {
                    $("#userEmail").val($.cookie("userEmail"));
                }
                $("#telphone").val($.cookie("userPhone"));
                $(".writeHead").on("click", function () {
                    $(".file").click();
                });
                $(".file").on("change", function (e) {
                    picture_clip.init(e.target, 400, 400, function (img_base64) {
                        var out = $(".imgHead");
                        out.attr("src", img_base64);
                        $.ajax({
                            url: "http://localhost:8080/user/changeUserAvatar",
                            type: "post",
                            data: {"userId": $.cookie("userId"), "userAvatar": img_base64},
                            success: function (res) {
                                if (res.result == 1) {
                                    localStorage.setItem("userAvatar", img_base64);
                                    location.reload();
                                }
                            }
                        });
                    });
                    $(this).val("");
                });
                $("#storeInformation").on('click', function () {
                    var userName = $("#name").val();
                    var userEmail = $("#userEmail").val();
                    if (userName == "") {
                        alert("请填写您的姓名");
                        return false;
                    } else {
                        $.ajax({
                            url: "http://localhost:8080/user/changeUserInfo",
                            type: "post",
                            data: {"userId": $.cookie("userId"), "userName": userName, "userEmail": userEmail},
                            success: function (res) {
                                console.log(res);
                                if (res.result == 1) {
                                    alert("修改成功");
                                    $.cookie("userName", userName);
                                    $.cookie("userEmail", userEmail);
                                    location.reload();
                                } else {
                                    alert("修改失败");
                                    return false;
                                }
                            }
                        });
                    }
                });
            } else if (url == "http://localhost:8080/userInformationaddress") {
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
                    url: "http://localhost:8080/user/getUserAddress",
                    type: "post",
                    data: {"userId": $.cookie("userId")},
                    success: function (res) {
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
                            // console.log("1");
                            // $(this).children(".dealAddrHandler").css("top", "0");
                            $(this).children(".dealAddrHandler").stop().animate({"top": "0"}, 400);
                        });
                        $(".showConsigneeM").on("mouseleave", function () {
                            // console.log("1");
                            // $(this).children(".dealAddrHandler").css("top", "-40px");
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
                                            url: "http://localhost:8080/user/insertNewAddress",
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
                    }
                });
            } else if (url == "http://localhost:8080/userinformationorder") {
                $.ajax({
                    url: "http://localhost:8080/user/getUserOrders",
                    type: "post",
                    data: {"userId": $.cookie("userId")},
                    success: function (res) {
                        console.log(res);
                        var totalorder =
                            '<div class="body_right_b_tO">' +
                            '<table>' +
                            '<tr>' +
                            '<td><span>产品名称</span></td>' +
                            '<td><span>单价/数量</span></td>' +
                            '<td><span>总价</span></td>' +
                            '<td><span>状态</span></td>' +
                            '<td><span>操作</span></td>' +
                            '</tr>' +
                            '</table>' +
                            '</div>' +
                            '{{each waitPush}}' +
                            '<div class="body_right_b_bO">' +
                            '<div class="body_right_b_b_tO" orderId = "{{$value.orderId}}">' +
                            '<span>订单编号：{{$value.orderId}}</span>' +
                            '<span>订单时间：{{$value.orderDate}}</span>' +
                            '</div>' +
                            '<div class="body_right_b_b_bO">' +
                            '<table>' +
                            '<tr>' +
                            '<td><span><img src="{{$value.commodityPicture}}" alt="">' +
                            '<a href="">{{$value.commodityTitle}}</a></span>' +
                            '</td>' +
                            '<td><span>￥{{$value.commodityPrice}} x {{$value.amount}}</span></td>' +
                            '<td><span>￥{{$value.orderAmount}}.00</span></td>' +
                            '<td><span>{{$value.orderStatus}}</span></td>' +
                            '<td>' +
                            ' <span class="watchOrder"></span>' +
                            '</td>' +
                            '</tr>' +
                            '</table>' +
                            '</div>' +
                            '</div>' +
                            '{{/each}}';
                        var reciveOrder =
                            '<div class="body_right_b_tO">' +
                            '<table>' +
                            '<tr>' +
                            '<td><span>产品名称</span></td>' +
                            '<td><span>单价/数量</span></td>' +
                            '<td><span>总价</span></td>' +
                            '<td><span>状态</span></td>' +
                            '<td><span>操作</span></td>' +
                            '</tr>' +
                            '</table>' +
                            '</div>' +
                            '{{each waitSend}}' +
                            '<div class="body_right_b_bO">' +
                            '<div class="body_right_b_b_tO" orderId = "{{$value.orderId}}">' +
                            '<span>订单编号：{{$value.orderId}}</span>' +
                            '<span>订单时间：{{$value.orderDate}}</span>' +
                            '</div>' +
                            '<div class="body_right_b_b_bO">' +
                            '<table>' +
                            '<tr>' +
                            '<td><span><img src="{{$value.commodityPicture}}" alt=""><a href="">{{$value.commodityTitle}}</a></span>' +
                            '</td>' +
                            '<td><span>￥{{$value.commodityPrice}} x {{$value.amount}}</span></td>' +
                            '<td><span>￥{{$value.orderAmount}}.00</span></td>' +
                            '<td><span>{{$value.orderStatus}}</span></td>' +
                            '<td>' +
                            '<span class="watchOrder"></span>' +
                            '</td>' +
                            '</tr>' +
                            '</table>' +
                            '</div>' +
                            '</div>' +
                            '{{/each}}';
                        res.waitSend.forEach(function (data) {
                            res.waitPush.push(data);
                        });
                        res.completed.forEach(function (data) {
                            res.waitPush.push(data);
                        });
                        if (res.waitPush.length == 0) {
                            $(".body .body_right > div:nth-of-type(2),.body .body_right > div:nth-of-type(3)").html("<div class=\"orderImg\"></div>\n" +
                                "<span>亲，您还没有相关的订单哟~</span>");
                        } else {
                            var render = template.compile(totalorder);
                            var html = render(res);
                            $(".body_right_bO").eq(0).html(html);
                            var render1 = template.compile(reciveOrder);
                            var html1 = render1(res);
                            $(".body_right_bO").eq(1).html(html1);
                        }
                        $("#tabOrderTotalO>td").on("click", function () {
                            var index = $(this).index();
                            if (index == 0) {
                                if (res.waitPush.length == 0) {
                                    $(".body .body_right > div:nth-of-type(2)").html("<div class=\"orderImg\"></div>\n" +
                                        "<span>亲，您还没有相关的订单哟~</span>");
                                }
                            } else if (index == 1) {
                                if (res.waitPush.length == 0) {
                                    $(".body .body_right > div:nth-of-type(3)").html("<div class=\"orderImg\"></div>\n" +
                                        "<span>亲，您还没有相关的订单哟~</span>");
                                }
                            }
                            $(this).children().addClass("bodyRbb").parent().siblings().children().removeClass("bodyRbb");
                            $(".body_right>div").eq(index + 1).show().siblings(".except").not(".body_right_tO").hide();
                        });
                        $(".body_right_bO").on("click", ".watchOrder", function () {
                            var orderId = $(this).parent().parent().parent().parent().parent().siblings().attr("orderId");
                            var obj = $(this).parents(".body_right");
                            var obj1 = $(this).parents(".body_right_bO ");
                            $(this).parent().parent().parent().parent().parent().parent().remove();
                            if (obj1.children().length == 1) {
                                obj.children("div").eq(1).html("<div class=\"orderImg\"></div>\n" +
                                    "<span>亲，您还没有相关的订单哟~</span>");
                            }
                            $.ajax({
                                url: "http://localhost:8080/order/cancel",
                                type: "post",
                                data: {"orderId": orderId, "userId": $.cookie("userId")},
                                success: function (res) {
                                    console.log(res);
                                    var totalorderD =
                                        '<div class="body_right_b_tO">' +
                                        '<table>' +
                                        '<tr>' +
                                        '<td><span>产品名称</span></td>' +
                                        '<td><span>单价/数量</span></td>' +
                                        '<td><span>总价</span></td>' +
                                        '<td><span>状态</span></td>' +
                                        '<td><span>操作</span></td>' +
                                        '</tr>' +
                                        '</table>' +
                                        '</div>' +
                                        '{{each waitSend}}' +
                                        '<div class="body_right_b_bO">' +
                                        '<div class="body_right_b_b_tO" orderId = "{{$value.orderId}}">' +
                                        '<span>订单编号：{{$value.orderId}}</span>' +
                                        '<span>订单时间：{{$value.orderDate}}</span>' +
                                        '</div>' +
                                        '<div class="body_right_b_b_bO">' +
                                        '<table>' +
                                        '<tr>' +
                                        '<td><span><img src="{{$value.commodityPicture}}" alt="">' +
                                        '<a href="">{{$value.commodityTitle}}</a></span>' +
                                        '</td>' +
                                        '<td><span>￥{{$value.commodityPrice}} x {{$value.amount}}</span></td>' +
                                        '<td><span>￥{{$value.orderAmount}}.00</span></td>' +
                                        '<td><span>{{$value.orderStatus}}</span></td>' +
                                        '<td>' +
                                        ' <span class="watchOrder"></span>' +
                                        '</td>' +
                                        '</tr>' +
                                        '</table>' +
                                        '</div>' +
                                        '</div>' +
                                        '{{/each}}';
                                    var reciveOrderD =
                                        '<div class="body_right_b_tO">' +
                                        '<table>' +
                                        '<tr>' +
                                        '<td><span>产品名称</span></td>' +
                                        '<td><span>单价/数量</span></td>' +
                                        '<td><span>总价</span></td>' +
                                        '<td><span>状态</span></td>' +
                                        '<td><span>操作</span></td>' +
                                        '</tr>' +
                                        '</table>' +
                                        '</div>' +
                                        '{{each waitSend}}' +
                                        '<div class="body_right_b_bO">' +
                                        '<div class="body_right_b_b_tO" orderId = "{{$value.orderId}}">' +
                                        '<span>订单编号：{{$value.orderId}}</span>' +
                                        '<span>订单时间：{{$value.orderDate}}</span>' +
                                        '</div>' +
                                        '<div class="body_right_b_b_bO">' +
                                        '<table>' +
                                        '<tr>' +
                                        '<td><span><img src="{{$value.commodityPicture}}" alt=""><a href="">{{$value.commodityTitle}}</a></span>' +
                                        '</td>' +
                                        '<td><span>￥{{$value.commodityPrice}} x {{$value.amount}}</span></td>' +
                                        '<td><span>￥{{$value.orderAmount}}.00</span></td>' +
                                        '<td><span>{{$value.orderStatus}}</span></td>' +
                                        '<td>' +
                                        '<span class="watchOrder"></span>' +
                                        '</td>' +
                                        '</tr>' +
                                        '</table>' +
                                        '</div>' +
                                        '</div>' +
                                        '{{/each}}';
                                    if (res.waitSend.length == 0) {
                                        $(".body .body_right > div:nth-of-type(3)").html("<div class=\"orderImg\"></div>\n" +
                                            "<span>亲，您还没有相关的订单哟~</span>");
                                    }
                                    else {
                                        var render = template.compile(totalorderD);
                                        var html = render(res);
                                        $(".body_right_bO").eq(0).html(html);
                                        var render1 = template.compile(reciveOrderD);
                                        var html1 = render1(res);
                                        $(".body_right_bO").eq(1).html(html1);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        });
        return false;
    });
});



