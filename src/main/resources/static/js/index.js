// 轮播图代码
$(function () {
    var count = 0;
    $(".arrow-right").on("click", function () {
        count++;
        if (count == 8) {
            count = 0;
        }
        $(".main_middle ul li").eq(count).stop().fadeIn(2000).siblings("li").fadeOut(2000);
        $(".main_middle ol li").eq(count).addClass("current").siblings("li").removeClass("current");

    });
    $(".arrow-left").on("click", function () {
        count--;
        if (count == -1) {
            count = 7;
        }
        $(".main_middle ul li").eq(count).stop().fadeIn(2000).siblings("li").stop().fadeOut(2000);
        $(".main_middle ol li").eq(count).addClass("current").siblings("li").removeClass("current");

    });

    function slider() {
        $(".main_middle ul li").eq(count).stop().fadeIn(2000).siblings("li").stop().fadeOut(2000);
        $(".main_middle ol li").eq(count).addClass("current").siblings("li").removeClass("current");
        count++;
        if (count > 8) {
            count = 0;
        }
    }

    var timeId = setInterval(slider, 4000);
    $(".main_middle").on("mouseenter", function () {
        clearInterval(timeId);
    });
    $(".main_middle").on("mouseleave", function () {
        timeId = setInterval(slider, 4000);
    });

    $(".main_middle ol li").on("click", function () {
        var index = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        $(".main_middle ul li").eq(index).fadeIn(2000).siblings("li").stop().fadeOut(2000);
    });
});
// 无缝滚动代码
$(function () {
    $(".guessYouLike").on("mouseenter", function () {
        $(this).children("div").show().parent().siblings().children("div").hide();
        // console.log($(this).children("div").parent());
        $(this).parent().siblings().eq(0).show().nextAll().hide();
        // console.log($(this).parent().siblings().eq(0));
    });
    $(".hotThings").on("mouseenter", function () {
        $(this).children("div").show().parent().siblings().children("div").hide();
        $(this).parent().siblings().eq(1).show().prev().hide();
    });
    var index = 0;
    $(".arrow_l").on("click", function () {
        index--;
        if (index == -1) {
            index = 2;
        }
        $(".clickRolling").eq(index).show().siblings().hide();

    });
    $(".arrow_r").on("click", function () {
        index++;
        $(".clickRolling").eq(index).show().siblings().hide();
        if (index == 2) {
            index = -1;
        }
    });

});