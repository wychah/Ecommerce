// 订单状态页面
$(function () {
    $.ajax({
        url: "http://localhost:8080/order/status",
        type: "get",
        data: {
            "orderId": sessionStorage.getItem("orderId")
        },
        success: function (res) {
            console.log(res);
            var order =
                '<div class="orderNumber">' +
                '<span>订单编号</span>' +
                '<span>{{orderId}}</span>' +
                '<span>订单状态</span>' +
                '<span>{{orderStatus}}</span>' +
                '</div>' +
                '<div class="orderOwnerInformation">' +
                '<span>收货人信息</span>' +
                '<span>{{location}}</span>' +
                '<span>{{receiverName}}</span>' +
                '<span>{{receiverPhone}}</span>' +
                '</div>' +
                '<div>' +
                '<span>支付方式</span>' +
                '<span>您需要在收货时用现金等方式向送货员支付订单款项。</span>' +
                '</div>' +
                '<div>' +
                '<span>配送方式</span>' +
                '<span>平邮</span>' +
                '</div>' +
                '<div class="giveSellerWords">' +
                '<span>给卖家留言</span>' +
                '</div>';
            var render = template.compile(order);
            var html = render(res.orderInfo);
            $(".orderInformation").html(html);
            var orderPrice =
                '{{each commodities as value}}' +
                '<div class="shoppingListTitle">购物清单</div>' +
                '<div class="shoppingListHandler">' +
                '<div class="shoppingListHandlerTitle">' +
                '<table>' +
                '<tr>' +
                '<td>名称</td>' +
                '<td>价格</td>' +
                '<td>数量</td>' +
                '<td>小计</td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '<div class="shoppingListHandlerDes">' +
                '<div class="shoppingListHandlerDesList">' +
                '<table>' +
                '<tr>' +
                '<td>' +
                '<img src="{{value.commodityPicture}}" alt="">' +
                '<span>{{value.commodityTitle}}</span>' +
                '</td>' +
                '<td>￥{{value.commodityPrice}}.00</td>' +
                '<td>{{value.amount}}</td>' +
                '<td>￥{{value.totalPrice}}.00</td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="mstlTotalWarp">' +
                '<div>商品总额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥68.00' +
                '</div>' +
                '<div>优惠金额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥0.00</div>' +
                '<div>运费：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥5.00</div>' +
                '<div>订单总金额：<span>￥{{value.orderAmount}}.00</span></div>' +
                '</div>' +
                '{{/each}}';
            var renderPrice = template.compile(orderPrice);
            var html = renderPrice(res);
            $(".shoppingList").html(html);
        }
    });
});
