package com.wsz.ecommerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController {

    @GetMapping("/login")
    public String loginPage(){
        return "login";
    }

    @GetMapping("/register")
    public String register(){
        return "register";
    }

    @GetMapping("/commodity")
    public String commodity() {
        return "shoppingDetail";
    }

    @GetMapping("/discount")
    public String discount() {
        return "discountRush";
    }

    @GetMapping("/order")
    public String order() {
        return "orderSettlement";
    }

    @GetMapping("/search")
    public String search() {
        return "shoppingList";
    }

    @GetMapping("/secondhand")
    public String secondHand() {
        return "newSecondHand";
    }

    @GetMapping("/appliance")
    public String appliance() {
        return "secondhandApplianceCity";
    }

    @GetMapping("/member")
    public String member() {
        return "memberPurchase";
    }

    @GetMapping("/userinfo")
    public String userInfo() {
        return "userInformation";
    }

    @GetMapping("/status")
    public String orderStatus() {
        return "orderStatus";
    }

    @GetMapping("/shoppingcart")
    public  String shoppingcart(){
        return "shoppingCart";
    }

    @GetMapping("/userinformationorder")
    public String userInformationOrder(){
        return "userinformation_order";
    }

    @GetMapping("/userInformation")
    public String userInformation(){
        return "userInformation";
    }

    @GetMapping("/userInformationaddress")
    public String userInformationAddress(){
        return "userInformation_address";
    }

    @GetMapping("/userInformationcollection")
    public String userInformationCollection(){
        return "userInformation_collection";
    }
}
