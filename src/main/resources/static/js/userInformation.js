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
        });
        return false;
    });
});



