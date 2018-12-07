// 用户资料
$(function () {
    $(".list-group-item").on("click", function () {
        var url = $(this).attr("href");
        $(this).parent().addClass("addBlBgc").siblings().removeClass("addBlBgc");
        $(".body_right").load(url + " .body_right>*",function () {
            $("#tabOrderTotalO>td").on("click", function () {
                var index = $(this).index();
                console.log(index);
                $(this).children().addClass("bodyRbb").parent().siblings().children().removeClass("bodyRbb");
                $(".body_right>div").eq(index + 1).show().siblings(".except").not(".body_right_tO").hide();
            });
        });
        return false;
    });
});



