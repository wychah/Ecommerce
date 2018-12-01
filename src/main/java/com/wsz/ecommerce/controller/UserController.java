package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.domain.UserBasicInfo;
import com.wsz.ecommerce.service.UserService;
import com.wsz.ecommerce.util.LoginResult;
import com.wsz.ecommerce.util.SuccessOrFail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String loginPage(){
        return "login";
    }

    //返回值为1说明该用户名已经存在
    @ResponseBody
    @PostMapping("/ifUserAccountRepeat")
    public SuccessOrFail ifUserAccountRepeat(@RequestParam("userAccount") String userAccount){
        return userService.ifUserAccountRepeat(userAccount);
    }

    //返回值为1说明该用户邮箱已经存在
    @ResponseBody
    @PostMapping("/ifUserEmailRepeat")
    public SuccessOrFail ifUserEmailRepeat(@RequestParam("userEmail") String userEmail){
        return userService.ifUserEmailRepeat(userEmail);
    }

    //返回值为1说明该用户联系电话已经存在
    @ResponseBody
    @PostMapping("/ifUserPhoneRepeat")
    public SuccessOrFail ifUserPhoneRepeat(@RequestParam("userPhone") String userPhone){
        return userService.ifUserPhoneRepeat(userPhone);
    }

    @ResponseBody
    @PostMapping("/toLogin")
    public LoginResult userLogin(@RequestParam("userAccount") String userAccount,
                                 @RequestParam("userPassword") String userPassword,
                                 HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginResult loginResult = userService.userLogin(userAccount,userPassword);
        if(loginResult.getLoginResult().equals("loginSuccess")){
            UserBasicInfo userBasicInfo = userService.getUserBasicInfo(loginResult.getUserId());
            session.setAttribute("user",userBasicInfo);
        }
        return loginResult;
    }

    //测试用
    @ResponseBody
    @RequestMapping(value = "/hello")
    public String hello(){
        return "Hello World!";
    }

    @ResponseBody
    @RequestMapping(value = "/find")
    public User find(){
        return userService.getUserById(1);
    }


}
