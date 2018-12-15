// 用户资料
$(function () {
    $(".list-group-item").on("click", function () {
        var url = $(this).attr("href");
        $(this).parent().addClass("addBlBgc").siblings().removeClass("addBlBgc");
        $(".body_right").load(url + " .body_right>*", function () {
            $(".writeHead").on("click", function () {
                $(".file").click();
            });
            $(".file").on("change", function (e) {
                picture_clip.init(e.target, 400, 400, function (img_base64) {
                    var out = $(".imgHead");
                    out.attr("src", img_base64);
                });
                this.val("");
            });
            $("#tabOrderTotalO>td").on("click", function () {
                var index = $(this).index();
                console.log(index);
                $(this).children().addClass("bodyRbb").parent().siblings().children().removeClass("bodyRbb");
                $(".body_right>div").eq(index + 1).show().siblings(".except").not(".body_right_tO").hide();
            });
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
                    }
                    else {
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
                        }
                        else {
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
                                }
                                else {
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
        });
        return false;
    });
});



