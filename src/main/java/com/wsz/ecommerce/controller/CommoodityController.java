package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.service.CommodityService;
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

    @GetMapping("/detail")
    @ResponseBody
    public Map getTheCommodity(@RequestParam("commodityId") Integer commodityId) {
        Map map = new HashMap();
        map.put("commodities",commodityService.getCommodityById(commodityId));
        return map;
    }
}
