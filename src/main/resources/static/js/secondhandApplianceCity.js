//二手电器城
$(function () {
    var data = '{{each commodities as value}}' +
        '<div class="newSecondThings">' +
        '<div class="newSecondThingsImg" commodityId = {{value.commodityId}}>' +
        '<img src="{{value.commodityPicture}}" alt="">' +
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
        url: "http://localhost:8080/appliance/show",
        type: "get",
        success: function (res) {
            var render = template.compile(data);
            var html = render(res);
            $(".newSecondThingsList").html(html);
            $(".newSecondThingsImg,.clickBuy").on("click", function () {
                var id = $(this).attr("commodityId");
                sessionStorage.setItem("commodityId", id);
                location.href = "http://localhost:8080/commodity";
            });
        }
    });
});
