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
public class SecondhandController {

    @Autowired
    private CommodityService commodityService;

    @GetMapping("/secondhand")
    public String secondHand() {
        return "newSecondHand";
    }

    @GetMapping("/appliance")
    public String appliance() {
        return "secondhandApplianceCity";
    }

    @GetMapping("/secondhand/show")
    @ResponseBody
    public Map getSecondHand() {
        Map map = new HashMap();
        List<CommodityBrief> commodityBriefList = commodityService.getSecondHand(1,12);
        map.put("commodities",commodityBriefList);
        return map;
    }

    @GetMapping("/appliance/show")
    @ResponseBody
    public Map getSecondHandAppliance() {
        Map map = new HashMap();
        List<CommodityBrief> commodityBriefList = commodityService.getSecondHandAppliance(1,12);
        map.put("commodities",commodityBriefList);
        return map;
    }
}
