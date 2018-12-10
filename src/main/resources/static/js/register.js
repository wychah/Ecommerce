// 注册模块
//生成验证码
$(function () {
    clickCode();
    $("#checkCode").on("click", clickCode);

    function clickCode() {
        var code = "";
        // 随机数
        var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (var i = 0; i < 6; i++) {
            var codeList = random[Math.floor(Math.random() * 36)];
            code += codeList;
        }
        $("#checkCode").val(code);
    }
});
//注册验证
$(function () {
    // $("#nickname").on("blur", function () {
    //     var userAccount = $("#nickname").val();
    //     if (userAccount != "") {
    //         $.ajax({
    //             url: "http://localhost:8080/user/ifUserAccountRepeat",
    //             type: "post",
    //             data: {userAccount: userAccount},
    //             success: function (res) {
    //                 console.log(res);
    //                 if (res.result == 1) {
    //                     var reg = /[\u4e00-\u9fa5]/g;
    //                     var value = $("#nickname").siblings("label").html().match(reg).join("") + "已存在";
    //                     createSpan($(this), value);
    //                 }
    //             }
    //         });
    //     }
    });
    $(".registry input").on("keyup", function () {

        $(".passwordStrength").hide();
        if ($(this).parent().next("span")) {
            $(this).parent().next("span").remove();
        }
        if ($(this).val() == "") {
            $(this).siblings("span").empty().html("*");
            // 提取文字
            var reg = /[\u4e00-\u9fa5]/g;
            // console.log($(this).siblings("label").html().match(reg).join(""));
            var value = $(this).siblings("label").html().match(reg).join("") + "不能为空";
            createSpan($(this), value);
        }
        else {
            var img = $("<img src='image/ok.png'>");
            $(this).siblings("span").html("");
            img.css({"width": "10", "height": "10"});
            img.appendTo($(this).siblings("span"));
        }
        if ($(this).val() != "" && $(this).attr("name") == "password" && $(this).val().length <= 6) {
            $(this).siblings("span").html("*");
            createSpan($(this), "密码长度要大于7位");
        }
        if ($(this).attr("name") == "password") {
            // console.log(1);
            var pwd = $(this).val();
            var level = 0;
            if (pwd != $("#passwordAgain").val() && $("#passwordAgain").val() != "") {
                if ($("#passwordAgain").parent().next("span")) {
                    $("#passwordAgain").parent().next("span").remove();
                }
                $("#passwordAgain").siblings("span").html("*");
                createSpan($("#passwordAgain"), "两次密码不一致");
            }
            else if (pwd == $("#passwordAgain").val() && $("#passwordAgain").val() != "") {
                $("#passwordAgain").parent().next("span").remove();
                var img = $("<img src='image/ok.png'>");
                $("#passwordAgain").siblings("span").html("");
                img.css({"width": "10", "height": "10"});
                img.appendTo($("#passwordAgain").siblings("span"));
            }
            if (pwd.length > 6) {
                $(".passwordStrength").show();
            }
            if (/[0-9]/.test(pwd)) {
                level++;
            }
            if (/[a-zA-Z]/.test(pwd)) {
                level++;
            }
            if (/[^0-9a-zA-Z_]/.test(pwd)) {
                level++;
            }
            $("#strengthLevel").attr("class", "strengthLv" + (pwd.length > 6 ? level : 0));
        }
        if ($(this).val() != "" && $(this).attr("name") == "passwordAgain" && $(this).val() != $("#password").val()) {
            if ($(this).parent().next("span")) {
                $(this).parent().next("span").remove();
            }
            if ($("#password").val() == "") {
                $(this).siblings("span").html("*");
                createSpan($(this), "请先输入密码");
            } else {
                $(this).siblings("span").html("*");
                createSpan($(this), "两次密码不一致");
            }
        }
        // 手机号码的正则表达式
        // 130 131 132 133 134 135 136 137 138 139
        // 143 147
        // 150 151 152 153 154 155 156 157 158 159
        // 170 171 173 176 177
        // 180 181 182 183 184 185 186 187 188 189
        if ($(this).val() != "" && $(this).attr("name") == "phonenumber") {
            var reg = /([1][358][0-9][0-9]{8})|([1][4][37][0-9]{8})|([1][7][01367][0-9]{8})/;
            if (!reg.test($(this).val())) {
                $(this).siblings("span").html("*");
                createSpan($(this), "请输入正确的手机号");
            }
        }
        if ($(this).val() != "" && $(this).attr("name") == "code" && $(this).val().toUpperCase() != $("#checkCode").val()) {
            createSpan($(this), "验证码不正确");
        }
    });
    $("#checkArgument").on("click", function () {
        if ($("#checkArgument").prop("checked")) {
            $("#registerBtn").css({cursor: " pointer", backgroundColor: "#ffda44", pointerEvents: "auto"});
        }
        else {
            $("#registerBtn").css({cursor: " default", backgroundColor: "#888", pointerEvents: "none"});
        }
    });
    $("#registerBtn").on("click", function () {
        if ($(".registry input").val() != "" && $(".registry>span").length == 0) {
            // console.log($(".registry>span"));
        } else {
            console.log("请正确填写信息");
        }
    });

    // 创建span节点封装
    function createSpan(container, value) {
        var span = $("<span>" + value + "</span>");
        span.addClass("registerMessage");
        span.insertAfter(container.parent());
    };
});

