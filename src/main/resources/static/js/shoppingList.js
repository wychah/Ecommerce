// 商品列表
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
        console.log(res);
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
        totallyPages = res.totalPages;
        // console.log(totallyPages);
        if ($("#pageNumber>ul>li")) {
            $("#pageNumber>ul>li").remove();
        }
        for (var i = 0; i < res.totalPages; i++) {
            var li = $("<li>" + (i + 1) + "</li>");
            if (i == 0) {
                li.addClass("pageColor prevent");
            }
            li.appendTo($("#pageNumber>ul"));
        }
        if (res.totalPages == 1) {
            $("#prePage").addClass("prevent").css("color", "gray");
            $("#nextPage").addClass("prevent").css("color", "gray");
        } else if (res.totalPages > 1) {
            $("#prePage").addClass("prevent").css("color", "gray");
            $("#nextPage").removeClass("prevent").css("color", "black");
        }
        $("#pageNumber>ul>li").on("click", function () {
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
            sessionStorage.setItem("currentPage", $(this).text());
            var newURLRequest = urlGet($(this).text());
            nextAJAX(newURLRequest, null, arr);
        });
        $(".imgItem").on("click", function () {
            var id = $(this).attr("commodityId");
            console.log(id);
            sessionStorage.setItem("commodityId", id);
            location.href = "http://localhost:8080/commodity";
        });
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
        if ($("#pageNumber>ul>li")) {
            $("#pageNumber>ul>li").remove();
        }
        for (var i = 0; i < res.totalPages; i++) {
            var li = $("<li>" + (i + 1) + "</li>");
            if (i == 0) {
                li.addClass("pageColor prevent");
            }
            li.appendTo($("#pageNumber>ul"));
        }
        if (res.totalPages == 1) {
            $("#prePage").addClass("prevent").css("color", "gray");
            $("#nextPage").addClass("prevent").css("color", "gray");
        } else if (res.totalPages > 1) {
            $("#prePage").addClass("prevent").css("color", "gray");
            $("#nextPage").removeClass("prevent").css("color", "black");
        }
        $("#pageNumber>ul>li").on("click", function () {
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
            sessionStorage.setItem("currentPage", $(this).text());
            var newURLRequest = urlGet($(this).text());
            nextAJAX(newURLRequest, null, arr);
        });
        $(".imgItem").on("click", function () {
            var id = $(this).attr("commodityId");
            console.log(id);
            sessionStorage.setItem("commodityId", id);
            location.href = "http://localhost:8080/commodity";
        });
    });
}

function nextAJAX(url, datas, arr) {
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
        totallyPages = res.totalPages;
        $("#pageNumber>ul>li").on("click", function () {
            // pageNumber = sessionStorage.getItem("currentPage");
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

function urlGet(currentpage) {
    var newUrl = window.sessionStorage.getItem("url");
    newUrl = newUrl.split("&");
    var urlhead = newUrl.shift().split("?");
    var urlheadRequest = urlhead[0];
    var restRequest = newUrl.join("&");
    var newURLRequest = urlheadRequest + "?" + "currentPage=" + currentpage + "&" + restRequest;
    return newURLRequest;
}

function getHead() {
    var newUrl = window.sessionStorage.getItem("url");
    newUrl = newUrl.split("&");
    var urlhead = newUrl.shift().split("?");
    var urlheadRequest = urlhead[0];
    return urlheadRequest;
}

function switchKeywords(keywords) {
    switch (keywords) {
        case "手机数码":
            return parseInt("1");
        case "母婴玩具":
            return parseInt("2");
        case "美妆护肤":
            return parseInt("3");
        case "居家日用":
            return parseInt("4");
        default:
            return keywords;
    }
}


