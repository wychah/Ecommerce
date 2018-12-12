package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.CommodityBrief;
import com.wsz.ecommerce.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/discount")
public class DiscountController {

    @Autowired
    private CommodityService commodityService;

    @GetMapping("/show")
    @ResponseBody
    public Map getDiscount() {
        return commodityService.queryAllCommodity(1,12);
    }
}
