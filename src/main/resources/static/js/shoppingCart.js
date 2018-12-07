// 购物车页面
$(function () {
    notClickchangeShoppingNumber($(".itemListNumber>input"), 50);
    $(".up").on("click", function () {
        clickchangeShoppingNumber($(this), $(this).siblings("input"), 50);
    });
    $(".down").on("click", function () {
        clickchangeShoppingNumber($(this), $(this).siblings("input"), 50);
    });
    $(".itemListNumber>input").on("keyup", function () {
        notClickchangeShoppingNumber($(this), 50);
    });

    // 全选和全不选
    $("#checkAll").on("click", function () {
        $(this).toggleClass("imgCheck");
        if ($(this).hasClass("imgCheck")) {
            $(".itemListCheck>label").addClass("imgCheck");
            $(".itemListCheck>label").parent().parent().parent().parent().parent().prev(".activity").children(".manjian").css("backgroundColor","#ff4a00");
        }
        else {
            $(".itemListCheck>label").removeClass("imgCheck");
            $(".itemListCheck>label").parent().parent().parent().parent().parent().prev(".activity").children(".manjian").css("backgroundColor","#e2e2e2");
        }
    });

    $(".itemListCheck>label").on("click", function () {
        var flag = true;
        $(this).toggleClass("imgCheck");
        for (var i = 0; i < $(".itemListCheck>label").length; i++) {
            if (!$(".itemListCheck>label").eq(i).hasClass("imgCheck")) {
                $(".itemListCheck>label").eq(i).parent().parent().parent().parent().parent().prev(".activity").children(".manjian").css("backgroundColor","#e2e2e2");
                flag = false;
            }
            else {
                $(".itemListCheck>label").eq(i).parent().parent().parent().parent().parent().prev(".activity").children(".manjian").css("backgroundColor","#ff4a00");
            }
        }
        if (flag == false) {
            $("#checkAll").removeClass("imgCheck");
        }
        else {
            $("#checkAll").addClass("imgCheck");
        }
    });

    //结算订单
    $("#payOrder").on("click",function () {
        location.href = "orderSettlement.html";
    });
    function clickchangeShoppingNumber(clickElement, changeElement, maxValue) {
        var thingsNumber = changeElement.val();
        if (clickElement.attr("class") == "up") {
            thingsNumber++;
        }
        else {
            thingsNumber--;
        }
        if (thingsNumber <= 1) {
            thingsNumber = 1;
            clickElement.parent().children(".up").css("backgroundPosition", "-625px -974px");
            clickElement.parent().children(".down").css("backgroundPosition", "-591px -1005px");
        }
        else if (thingsNumber >= maxValue) {
            thingsNumber = maxValue;
            clickElement.parent().children(".up").css("backgroundPosition", "-591px -974px");
            clickElement.parent().children(".down").css("backgroundPosition", "-625px -1005px");
        }
        else {
            clickElement.parent().children(".down").css("backgroundPosition", "-625px -1005px");
            clickElement.parent().children(".up").css("backgroundPosition", "-625px -974px");
        }
        changeElement.val(thingsNumber);
    }

    function notClickchangeShoppingNumber(changeElement, maxValue) {
        var thingsNumber = changeElement.val();
        if (thingsNumber <= 1) {
            $(".up").css("backgroundPosition", "-625px -974px");
            $(".down").css("backgroundPosition", "-591px -1005px");
        }
        else if (thingsNumber >= maxValue) {
            $(".up").css("backgroundPosition", "-591px -974px");
            $(".down").css("backgroundPosition", "-625px -1005px");
        }
        else {
            $(".down").css("backgroundPosition", "-625px -1005px");
            $(".up").css("backgroundPosition", "-625px -974px");
        }
    }
});