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
        $(".imgItem,.buyOnce").on("click", function () {
            var id = $(this).attr("commodityId");
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
        $(".imgItem,.buyOnce").on("click", function () {
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

// 搜索时显示下拉框
$(function () {
    $("#searchText").on('keyup', function (e) {
        if ($(this).val().length === 1 && e.keyCode !== 8) {
            $.ajax({
                url: "http://localhost:8080/search/keyword",
                type: "get",
                data: {keyword: $(this).val()},
                async: false,
                success: function (res) {
                    window.keyWords = res;
                }
            });
        }
        // 每次键盘抬起的时候判断有没有div，有就删除一次
        if ($("#dv")) {
            $("#dv").remove();
            // $(".searchItem").empty($("#dv"));
        }
        var value = this.value;
        //创建空数组
        var objArr = [];
        // 循环遍历数组，找到匹配文本输入框内容的字符串
        keyWords.forEach(function (data) {
            if (data.indexOf(value) !== -1) {
                objArr.push(data);
            }
        });
        // 判断：当输入框内容为空或者objArr中没有内容时应该删除div
        if (value == "" || objArr.length == 0) {
            $("#dv").remove();
            return;
        }
        // 创建显示数据的div
        var dv = $("<div id='dv' style='border:1px solid green;width: 242px;background-color: white'></div>");
        dv.appendTo($(".searchItem"));
        // 显示objArr中的数据
        objArr.forEach(function (data) {
            var p = $("<p style='margin: 5px 0;cursor:pointer;text-overflow: ellipsis;overflow: hidden;white-space: nowrap'></p>");
            p.text(data);
            p.appendTo(dv);
            p.on('mouseenter', f1);
            p.on('mouseleave', f2);
            p.on('click', f3);
        });
        $(".searchItem").on('click', function (e) {
            e.stopPropagation();
        });
        $(document).on('click', function () {
            $("#dv").remove();
        });
        $("#searchText").on('focus', function () {
            $(this).trigger('keyup');
        });

        function f1() {
            $(this).css("backgroundColor", "#e6e6e6");
        }

        function f2() {
            $(this).css("backgroundColor", "");
        }

        function f3() {
            $("#searchText").val($(this).text());
            $("#dv").remove();
        }
    });
});

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


