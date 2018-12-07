// 订单结算页面
$(function () {
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
    $("#delAddrBtn").on("click", function () {
        if ($(".showConsigneeM").length == 1) {
            $(this).parent().parent().stop().hide();
        }
        else {
            $(this).parent().parent().remove();
        }
    });
    //修改收货人信息
    var flag = true;
    $("#editAddrBtn").on("click", function () {
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
        }.bind(that));
    });
    // 添加收货人信息
    $("#addConsigneeM").on("click", function () {
        $(".barrier").stop().show();
        $(".changeInformation").stop().show();
        $("#changeInformationBtnOk").on("click", function () {
            if (flag == true) {
                var name = $("#changeInformationDes_name_t").val();
                var address = $("#changeInformationDes_address").val();
                var tel = $("#changeInformationDes_tel").val();
                var newInformation = $(".addConsignee").children().eq(0).clone(true);
                // console.log(newInformation.children());
                newInformation.removeClass("addBorder");
                newInformation.children(".showConsigneeMName").children("span").html(name);
                newInformation.children(".showConsigneeMPlace").children("span").html(address);
                newInformation.children(".showConsigneeMTel").children("span").html(tel);
                newInformation.stop().show();
                newInformation.insertBefore($("#addConsigneeM"));
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
});