package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.service.CommodityService;
import com.wsz.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/commodity")
public class CommoodityController {

    @Autowired
    private CommodityService commodityService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/detail")
    @ResponseBody
    public Map getTheCommodity(@RequestParam("commodityId") Integer commodityId, HttpServletRequest request) {
        request.getSession().invalidate();
        return commodityService.getCommodityById(commodityId);
    }

    @PostMapping("/check")
    @ResponseBody
    public String checkCommodityInventory(@RequestParam("commodityId") int commodityId, @RequestParam("amount") int amount) {
        return orderService.checkCommodityInventory(commodityId,amount);
    }

    @GetMapping("/indexCommodity")
    @ResponseBody
    public Map getIndexCommodity() {
        Map map = new HashMap();
        map.put("digitalCommodities",commodityService.queryCommodityBySortId(1,1,8));
        map.put("childrenCommodities",commodityService.queryCommodityBySortId(2,1,8));
        return map;
    }
}
