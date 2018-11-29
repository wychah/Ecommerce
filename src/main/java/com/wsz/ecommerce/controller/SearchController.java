package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/search")
public class SearchController {

    // 每页最大显示商品个数
    private static double SIZE = 12;

    @Autowired
    private CommodityService commodityService;

    @GetMapping()
    public String search() {
        return "shoppingList";
    }

    @GetMapping("/asc")
    @ResponseBody
    public Map searchAll() {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.allCommoodityAmount() / SIZE);
        map.put("totalPages",totalPages);
        int currentPage = 1;
        int startNum = (int) ((currentPage - 1) * SIZE);
        map.put("commodities",commodityService.queryAllCommodity(startNum, (int) SIZE));
        return map;
    }

    @GetMapping("/desc")
    @ResponseBody
    public Map searchAllDESC() {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.allCommoodityAmount() / SIZE);
        map.put("totalPages",totalPages);
        int currentPage = 1;
        int startNum = (int) ((currentPage - 1) * SIZE);
        map.put("commodities",commodityService.queryAllCommodityDESC(startNum, (int) SIZE));
        return map;
    }

    @GetMapping("/priceasc")
    @ResponseBody
    public Map sortAllCommodityASC() {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.allCommoodityAmount() / SIZE);
        map.put("totalPages",totalPages);
        int currentPage = 1;
        int startNum = (int) ((currentPage - 1) * SIZE);
        map.put("commodities",commodityService.queryAllCommodityByPriceASC(startNum, (int) SIZE));
        return map;
    }

    @GetMapping("/pricedesc")
    @ResponseBody
    public Map sortAllCommodityDESC() {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.allCommoodityAmount() / SIZE);
        map.put("totalPages",totalPages);
        int currentPage = 1;
        int startNum = (int) ((currentPage - 1) * SIZE);
        map.put("commodities",commodityService.queryAllCommodityByPriceDESC(startNum, (int) SIZE));
        return map;
    }

    @GetMapping("/{commodityTitle}")
    @ResponseBody
    public Map searchCommodity(@PathVariable("commodityTitle") String title) {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.resultAmount(title) / SIZE);
        map.put("totalPages",totalPages);
        int currentPage = 1;
        int startNum = (int) ((currentPage - 1) * SIZE);
        map.put("commodities",commodityService.queryCommodityByTitle(title, startNum, (int) SIZE));
        return map;
    }

    @GetMapping("/{commodityTitle}/priceasc")
    @ResponseBody
    public Map searchCommodityASC(@PathVariable("commodityTitle") String title) {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.resultAmount(title) / SIZE);
        map.put("totalPages",totalPages);
        int currentPage = 1;
        int startNum = (int) ((currentPage - 1) * SIZE);
        map.put("commodities",commodityService.searchCommodityByPriceASC(title, startNum, (int) SIZE));
        return map;
    }

    @GetMapping("/{commodityTitle}/pricedesc")
    @ResponseBody
    public Map searchCommodityDESC(@PathVariable("commodityTitle") String title) {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.resultAmount(title) / SIZE);
        map.put("totalPages",totalPages);
        int currentPage = 1;
        int startNum = (int) ((currentPage - 1) * SIZE);
        map.put("commodities",commodityService.searchCommodityByPriceDESC(title, startNum, (int) SIZE));
        return map;
    }

    @GetMapping("/sort/{sortId}")
    @ResponseBody
    public Map queryCommodityBySortId(@PathVariable("sortId") Integer sortId) {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(commodityService.sortResultAmount(sortId) / SIZE);
        map.put("totalPages",totalPages);
        int currentPage = 1;
        int startNum = (int) ((currentPage - 1) * SIZE);
        map.put("commodities",commodityService.queryCommodityBySortId(sortId,startNum, (int) SIZE));
        return map;
    }
}
