// 新品二手
$(function () {
    var data = '{{each commodities as value}}' +
        '<div class="newSecondThings">' +
        '<div class="newSecondThingsImg" commodityId = {{value.commodityId}}>' +
        '<img data-original="{{value.commodityPicture}}" alt="">' +
        '</div>' +
        '<div class="newSecondThingsImgDes">' +
        '<div title="{{value.commodityTitle}}">{{value.commodityTitle}}</div>' +
        '<div>' +
        '<span>￥</span>' +
        '<span>{{value.commodityPrice}}</span>' +
        '<span>.00</span>' +
        '<span class="clickBuy" commodityId = {{value.commodityId}}>立即购买</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '{{/each}}';
    $.ajax({
        url: "http://localhost:8080/secondhand/show",
        type: "get",
        success: function (res) {
            var render = template.compile(data);
            var html = render(res);
            $(".newSecondThingsList").html(html);
            $("img").lazyload();
            $(".newSecondThingsImg,.clickBuy").on("click", function () {
                var id = $(this).attr("commodityId");
                sessionStorage.setItem("commodityId", id);
                location.href = "http://localhost:8080/commodity";
            });
        }
    });

    $(".phone").on("click", function () {
        sessionStorage.setItem("url", "http://localhost:8080/search/sort?currentPage=1&maxSize=12&sortId=1&type=titleasc");
        sessionStorage.setItem("text", "手机数码");
        sessionStorage.setItem("rotateName", 1);
        sessionStorage.setItem("rotatePrice", 1);
        sessionStorage.setItem("backgroundColorName", "rgb(245, 245, 245)");
        location.href = "http://localhost:8080/search";
    });
    $(".children").on("click", function () {
        sessionStorage.setItem("url", "http://localhost:8080/search/sort?currentPage=1&maxSize=12&sortId=2&type=titleasc");
        sessionStorage.setItem("text", "母婴玩具");
        sessionStorage.setItem("rotateName", 1);
        sessionStorage.setItem("rotatePrice", 1);
        sessionStorage.setItem("backgroundColorName", "rgb(245, 245, 245)");
        location.href = "http://localhost:8080/search";
    });
    $(".home").on("click", function () {
        sessionStorage.setItem("url","http://localhost:8080/search/sort?currentPage=1&maxSize=12&sortId=4&type=titleasc");
        sessionStorage.setItem("text","居家日用");
        sessionStorage.setItem("rotateName",1);
        sessionStorage.setItem("rotatePrice",1);
        sessionStorage.setItem("backgroundColorName","rgb(245, 245, 245)");
        location.href = "http://localhost:8080/search";
    });
});
