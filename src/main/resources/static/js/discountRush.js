// 优惠抢购页面
$(function () {
    var data = '{{each commodities as value}}' +
        '<div class="discountBoutique_bottomThings">' +
        '<div class="discountBoutique_bottomThingsImg" commodityId = {{value.commodityId}}>' +
        '<img data-original="{{value.commodityPicture}}" alt="">' +
        '</div>' +
        '<div class="discountBoutique_bottomThingsDes">' +
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
        url: "http://localhost:8080/discount/show",
        type: "get",
        success: function (res) {
            var render = template.compile(data);
            var html = render(res);
            $(".discountBoutique_bottom").html(html);
            $("img").lazyload();
            $(".discountBoutique_bottomThingsImg,.clickBuy").on("click", function () {
                var id = $(this).attr("commodityId");
                sessionStorage.setItem("commodityId", id);
                location.href = "http://localhost:8080/commodity";
            });
        }
    });

    $(".preferential_left").on("click", function () {
        sessionStorage.setItem("url", "http://localhost:8080/search/sort?currentPage=1&maxSize=12&sortId=1&type=titleasc");
        sessionStorage.setItem("text", "手机数码");
        sessionStorage.setItem("rotateName", 1);
        sessionStorage.setItem("rotatePrice", 1);
        sessionStorage.setItem("backgroundColorName", "rgb(245, 245, 245)");
        location.href = "http://localhost:8080/search";
    });
    $(".preferential_middle").on("click", function () {
        sessionStorage.setItem("url", "http://localhost:8080/search/sort?currentPage=1&maxSize=12&sortId=2&type=titleasc");
        sessionStorage.setItem("text", "母婴玩具");
        sessionStorage.setItem("rotateName", 1);
        sessionStorage.setItem("rotatePrice", 1);
        sessionStorage.setItem("backgroundColorName", "rgb(245, 245, 245)");
        location.href = "http://localhost:8080/search";
    });
    $(".preferential_right").on("click", function () {
        sessionStorage.setItem("url", "http://localhost:8080/search/sort?currentPage=1&maxSize=12&sortId=3&type=titleasc");
        sessionStorage.setItem("text", "美妆护肤");
        sessionStorage.setItem("rotateName", 1);
        sessionStorage.setItem("rotatePrice", 1);
        sessionStorage.setItem("backgroundColorName", "rgb(245, 245, 245)");
        location.href = "http://localhost:8080/search";
    });
});
