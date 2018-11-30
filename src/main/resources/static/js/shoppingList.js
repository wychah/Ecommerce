// 商品列表
// 页码判断
$(function () {
    var pageNumber = 0;
    // 获取li,并且遍历所有的li
    $("#prePage").on("click", function () {
        pageNumber--;
        $("#pageNumber>ul>li").eq(pageNumber).addClass("pageColor").siblings("li").removeClass("pageColor");
        $("#pageNumber>ul>li").eq(pageNumber).addClass("prevent").siblings("li").removeClass("prevent");
        $("#nextPage").removeClass("prevent").css("color", "black");
        if (pageNumber == 0) {
            $(this).addClass("prevent").css("color", "gray");
        }
        else {
            $(this).removeClass("prevent").css("color", "black");
        }
    });
    $("#nextPage").on("click", function () {
        pageNumber++;
        $("#pageNumber>ul>li").eq(pageNumber).addClass("pageColor").siblings("li").removeClass("pageColor");
        $("#pageNumber>ul>li").eq(pageNumber).addClass("prevent").siblings("li").removeClass("prevent");
        $("#prePage").removeClass("prevent").css("color", "black");
        if (pageNumber == totallyPages - 1) {
            $(this).addClass("prevent").css("color", "gray");
        }
        else {
            $(this).removeClass("prevent").css("color", "black");
        }
    });
});
// 筛选框判断
$(function () {
    $(".filter>div").on("click", function () {
        $(this).css("backgroundColor", "white").siblings("div").css("backgroundColor", "#f5f5f5");
        var nowR = $(this).children("i").css("transform").replace(/[^0-9\-,]/g, '').split(',')[3];
        // console.log(nowR);
        var r = nowR == 1 ? 180 : 0;
        $(this).children("i").css("transform", "rotate(" + r + "deg)").parent().siblings().children("i").css("transform", "rotate(0deg)");
    });
    $(".filter>div:nth-of-type(3)").children().on("click", function (e) {
        e.stopPropagation();
    });
});
// 点击搜索框重置筛选
$("#searchBtn").on("click", function () {
    $(".filter>div").eq(0).css("backgroundColor", "white").siblings("div").css("backgroundColor", "#f5f5f5");
    $(".filter>div").children("i").css("transform", "rotate(0deg)");
});

// ajax Get封装
function ajaxGet(url, datas, arr) {
    $.get(url, datas, function (res) {
        var data = {commont: res};
        var render = template.compile(arr);
        var html = render(data.commont);
        $(".listItem").html(html);
        window.sessionStorage.removeItem("url");
        window.sessionStorage.setItem("url", this.url);
        var text = $("#searchText").val();
        sessionStorage.setItem("text", text);
        var rotateName = $("#sortByName").children("i").css("transform").replace(/[^0-9\-,]/g, '').split(',')[3];
        sessionStorage.setItem("rotateName", rotateName);
        var rotatePrice = $("#sortByPrice").children("i").css("transform").replace(/[^0-9\-,]/g, '').split(',')[3];
        sessionStorage.setItem("rotatePrice", rotatePrice);
        var backgroundColorName = $("#sortByName").css("backgroundColor");
        sessionStorage.setItem("backgroundColorName", backgroundColorName);
        var backgroundColorPrice = $("#sortByPrice").css("backgroundColor");
        sessionStorage.setItem("backgroundColorPrice", backgroundColorPrice);
    });
}
function aGet(url, datas, arr) {
    $.get(url, datas, function (res) {
        var data = {commont: res};
        var render = template.compile(arr);
        var html = render(data.commont);
        $(".listItem").html(html);
        window.sessionStorage.removeItem("url");
        window.sessionStorage.setItem("url", this.url);
        var text = $("#searchText").val();
        sessionStorage.setItem("text", text);
        window.totallyPages = res.totalPages;
        for (var i = 0; i < res.totalPages; i++) {
            var li = $("<li>" + (i + 1) + "</li>");
            if (i == 0) {
                li.addClass("pageColor prevent");
            }
            li.appendTo($("#pageNumber>ul"));
        }
        $("#pageNumber>ul>li").on("click", function () {
            pageNumber = $(this).text() - 1;
            console.log(pageNumber);
            $(this).addClass("pageColor").siblings("li").removeClass("pageColor");
            $(this).addClass("prevent").siblings("li").removeClass("prevent");
            if ($(this).text() == 1) {
                $("#prePage").addClass("prevent").css("color", "gray");
            } else {
                $("#prePage").removeClass("prevent").css("color", "black");
            }
            if ($(this).text() == totallyPages) {
                $("#nextPage").addClass("prevent").css("color", "gray");
            } else {
                $("#nextPage").removeClass("prevent").css("color", "black");
            }
        });
    });
}



