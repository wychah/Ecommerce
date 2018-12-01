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

    //用户注册，注册成功跳转到
    @PostMapping("/toRegister")
    public SuccessOrFail userRegister(@RequestBody User user,
                               HttpServletRequest request){
        //先注册，再登录,如果注册判断失败就返回失败，若是成功返回成功之后再登录并且将用户基本信息存入session
        HttpSession session = request.getSession();
        //此时的结果为注册是否成功的结果，默认登录成功所以直接继承结果，若是登录失败则将结果改为0
        SuccessOrFail successOrFail = userService.userRegister(user);
        //如果注册成功则执行登录
        if(successOrFail.getResult()==1){
            LoginResult loginResult = userService.userLogin(user.getUserAccount(),user.getUserPassword());
            if(loginResult.getLoginResult().equals("loginSuccess")){
                UserBasicInfo userBasicInfo = userService.getUserBasicInfo(loginResult.getUserId());
                session.setAttribute("user",userBasicInfo);
            }
            else{
                successOrFail.setResult(0);
            }
        }
        //此处返回的是登录结果
        return successOrFail;
    }

    //用户注册，注册成功跳转到
//    @PostMapping("/toRegister")
//    public String userRegister(@RequestParam("userAccount") String userAccount,
//                               @RequestParam("userPassword") String userPassword,
//                               @RequestParam("userName") String userName,
//                               @RequestParam("userEmail") String userEmail,
//                               @RequestParam("userPhone") String userPhone,
//                               @RequestParam("userAvatar") String userAvatar,
//                               HttpServletRequest request){
//
//        return "";
//    }

    //测试用
    @ResponseBody
    @RequestMapping(value = "/hello")
    public String hello(){
        return "Hello World!";
    }

    //传入json字符串,测试用
    @ResponseBody
    @PostMapping("/test")
    public User test(@RequestBody User user){
        return user;
    }

    @ResponseBody
    @RequestMapping(value = "/find")
    public User find(){
        return userService.getUserById(1);
    }


}
