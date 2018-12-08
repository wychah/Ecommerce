package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.OrderInfo;
import com.wsz.ecommerce.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private CommodityService commodityService;

    @GetMapping()
    public String order() {
        return "orderSettlement";
    }

    @GetMapping("/buy")
    @ResponseBody
    public Map payOrder(@RequestParam("id") Integer id, @RequestParam("thingsNumber") int amount, HttpServletRequest request) {
        Map map = new HashMap();
        HttpSession session = request.getSession();
        session.getAttribute("commodityId");
        map.put("orderInfo",commodityService.getOrderInfo(id, amount));
        return map;
    }
}
