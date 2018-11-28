package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

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
