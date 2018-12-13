package com.wsz.ecommerce.controller;


import com.wsz.ecommerce.domain.CommodityCart;
import com.wsz.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    //如果清空了会返回空list
    @PostMapping("/delete")
    @ResponseBody
    public List<CommodityCart> deleteCommodity(@RequestParam("userId") int userId,
                                               @RequestParam("commodityId") int commodityId){
        List<CommodityCart> commodityCarts = cartService.deleteCommodity(userId, commodityId);
        return commodityCarts;
    }

    //
    @ResponseBody
    @PostMapping("/add")
    public List<CommodityCart> addCommodity(@RequestParam("userId") int userId,
                                            @RequestParam("commodityId") int CommodityId,
                                            @RequestParam("amount") int amount){
        List<CommodityCart> commodityCarts = cartService.addCommodity(userId, CommodityId, amount);
        return commodityCarts;
    }
}
