package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.service.CommodityService;
import com.wsz.ecommerce.util.MapUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private CommodityService commodityService;

    @GetMapping()
    public String search() {
        return "shoppingList";
    }

    @GetMapping("/pricerange")
    @ResponseBody
    public Map searchCommodityBetweenPrice(@RequestParam("minPrice") int minPrice, @RequestParam("maxPrice") int maxPrice, @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        if (maxPrice == -1) {
            return MapUtil.setMap(commodityService.priceOverAmount(minPrice),maxSize,currentPage,commodityService.priceMoreThan(minPrice,startNum,maxSize));
        } else {
            return MapUtil.setMap(commodityService.rangeResultAmount(minPrice,maxPrice),maxSize,currentPage,commodityService.searchCommodityBetweenPrice(minPrice,maxPrice,startNum,maxSize));
        }
    }

    @GetMapping("/asc")
    @ResponseBody
    public Map searchAll(@RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.queryAllCommodity(startNum,maxSize));
    }

    @GetMapping("/desc")
    @ResponseBody
    public Map searchAllDESC(@RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.queryAllCommodityDESC(startNum, maxSize));
    }

    @GetMapping("/priceasc")
    @ResponseBody
    public Map sortAllCommodityASC(@RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.queryAllCommodityByPriceASC(startNum,maxSize));
    }

    @GetMapping("/pricedesc")
    @ResponseBody
    public Map sortAllCommodityDESC(@RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.queryAllCommodityByPriceDESC(startNum,maxSize));
    }

    @GetMapping("/{commodityTitle}")
    @ResponseBody
    public Map searchCommodity(@PathVariable("commodityTitle") String title, @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.resultAmount(title),maxSize,currentPage,commodityService.queryCommodityByTitle(title, startNum, maxSize));
    }

    @GetMapping("/{commodityTitle}/priceasc")
    @ResponseBody
    public Map searchCommodityASC(@PathVariable("commodityTitle") String title, @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.resultAmount(title),maxSize,currentPage,commodityService.searchCommodityByPriceASC(title, startNum,maxSize));
    }

    @GetMapping("/{commodityTitle}/pricedesc")
    @ResponseBody
    public Map searchCommodityDESC(@PathVariable("commodityTitle") String title, @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.resultAmount(title),maxSize,currentPage,commodityService.searchCommodityByPriceDESC(title, startNum,maxSize));
    }

    @GetMapping("/{commodityTitle}/titleasc")
    @ResponseBody
    public Map searchCommodityByTitleASC(@PathVariable("commodityTitle") String title, @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.resultAmount(title),maxSize,currentPage,commodityService.searchCommodityByTitleASC(title, startNum,maxSize));
    }

    @GetMapping("/{commodityTitle}/titledesc")
    @ResponseBody
    public Map searchCommodityByTitleDESC(@PathVariable("commodityTitle") String title, @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.resultAmount(title),maxSize,currentPage,commodityService.searchCommodityByTitleDESC(title, startNum,maxSize));
    }

    @GetMapping("/sort/{sortId}")
    @ResponseBody
    public Map queryCommodityBySortId(@PathVariable("sortId") Integer sortId, @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.sortResultAmount(sortId), maxSize, currentPage, commodityService.queryCommodityBySortId(sortId,startNum,maxSize));
    }
}
