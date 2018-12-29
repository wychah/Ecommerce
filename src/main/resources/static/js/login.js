//登录
$(function () {
    $("#loginBtn").on("click", function () {
        var userAccount = $("#userName").val();
        var userPassword = $.md5($("#password").val());
        console.log(userPassword);
        $.post("http://localhost:8080/user/toLogin", {
            userAccount: userAccount,
            userPassword: userPassword
        }, function (res) {
            console.log(res);
            if (res.loginResult == "loginSuccess") {
                $.cookie("userId", res.userId, {expires: 1});
                if (sessionStorage.getItem("lastPage") != undefined) {
                    location.href = sessionStorage.getItem("lastPage");
                }
                else {
                    location.href = "http://localhost:8080";
                }
            }
            else {
                alert("登陆失败");
                return false;
            }
        });
    });
});

