package com.wsz.ecommerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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
}
