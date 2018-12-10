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
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private CommodityService commodityService;

    @GetMapping("/show")
    @ResponseBody
    public Map getDiscount() {
        Map map = new HashMap();
        List<CommodityBrief> commodityBriefList = commodityService.queryAllCommodity(1,12);
        map.put("commodities",commodityBriefList);
        return map;
    }
}
