package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.domain.UserBasicInfo;
import com.wsz.ecommerce.service.UserService;
import com.wsz.ecommerce.util.LoginResult;
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
