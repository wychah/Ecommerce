//用户资料订单页
$(function () {
    $("#tabOrderTotalO>td").on("click", function () {
        var index = $(this).index();
        $(this).children().addClass("bodyRbb").parent().siblings().children().removeClass("bodyRbb");
        $(".body_right>div").eq(index + 1).show().siblings(".except").not(".body_right_tO").hide();
    });
});

