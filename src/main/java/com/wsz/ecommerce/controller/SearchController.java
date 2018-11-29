package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
public class SearchController {

    // 每页最大显示商品个数
    private static double SIZE = 12;

    @Autowired
    private CommodityService commodityService;

    @GetMapping("")
    public Map searchAll() {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.allCommoodityAmount() / SIZE);
        map.put("totalPages",totalPages);
        map.put("commodities",commodityService.queryAllCommodity());
        return map;
    }

    @GetMapping("/{commodityTitle}")
    public List<CommodityDetail> searchCommodity(@PathVariable("commodityTitle") String title) {
        return commodityService.queryCommodityByTitle(title);
    }
}
