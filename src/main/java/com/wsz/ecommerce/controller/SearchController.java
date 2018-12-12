package com.wsz.ecommerce.controller;

import com.sun.org.apache.bcel.internal.generic.SWAP;
import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.service.CommodityService;
import com.wsz.ecommerce.util.MapUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private CommodityService commodityService;

    /**
     * 按价格区间查询商品
     * @param minPrice
     * @param maxPrice
     * @param currentPage
     * @param maxSize
     * @return
     */
    @GetMapping("/pricerange")
    @ResponseBody
    public Map searchCommodityBetweenPrice(@RequestParam("minPrice") int minPrice, @RequestParam("maxPrice") int maxPrice,
                                           @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize) {
        int startNum = (currentPage - 1) * maxSize;
        return MapUtil.setMap(commodityService.rangeResultAmount(minPrice, maxPrice), maxSize, currentPage, commodityService.searchCommodityBetweenPrice(minPrice, maxPrice, startNum, maxSize));
    }

    /**
     * 查询所有商品
     * @param currentPage
     * @param maxSize
     * @param type
     * @return
     */
    @GetMapping("/all")
    @ResponseBody
    public Map searchAllCommodity(@RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize, @RequestParam("type") String type) {
        int startNum = (currentPage - 1) * maxSize;
        switch (type) {
            default:
                return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.findAll(startNum,maxSize));
            case "titleasc":
                return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.findAll(startNum,maxSize));
            case "titledesc":
                return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.queryAllCommodityDESC(startNum, maxSize));
            case "priceasc":
                return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.queryAllCommodityByPriceASC(startNum,maxSize));
            case "pricedesc":
                return MapUtil.setMap(commodityService.allCommoodityAmount(),maxSize,currentPage,commodityService.queryAllCommodityByPriceDESC(startNum,maxSize));
        }
    }

    /**
     * 按输入查询商品
     * @param keywords
     * @param currentPage
     * @param maxSize
     * @param type
     * @return
     */
    @GetMapping("/commodity")
    @ResponseBody
    public Map searchCommodity(@RequestParam("keywords") String keywords, @RequestParam("currentPage") int currentPage, @RequestParam("maxSize") int maxSize, @RequestParam("type") String type) {
        int startNum = (currentPage - 1) * maxSize;
        switch (type) {
            case "titleasc":
                return MapUtil.setMap(commodityService.resultAmount(keywords),maxSize,currentPage,commodityService.queryCommodityByTitle(keywords, startNum, maxSize));
            case "titledesc":
                return MapUtil.setMap(commodityService.resultAmount(keywords),maxSize,currentPage,commodityService.searchCommodityByTitleDESC(keywords, startNum,maxSize));
            case "priceasc":
                return MapUtil.setMap(commodityService.resultAmount(keywords),maxSize,currentPage,commodityService.searchCommodityByPriceASC(keywords, startNum,maxSize));
            case "pricedesc":
                return MapUtil.setMap(commodityService.resultAmount(keywords),maxSize,currentPage,commodityService.searchCommodityByPriceDESC(keywords, startNum,maxSize));
            default:
                return MapUtil.setMap(commodityService.resultAmount(keywords),maxSize,currentPage,commodityService.queryCommodityByTitle(keywords, startNum, maxSize));
        }
    }

    /**
     * 按分类查询商品
     * @param sortId
     * @param currentPage
     * @param maxSize
     * @param type
     * @return
     */
    @GetMapping("/sort")
    @ResponseBody
    public Map queryCommodityBySortId(@RequestParam("sortId") Integer sortId, @RequestParam("currentPage") int currentPage,
                                      @RequestParam("maxSize") int maxSize, @RequestParam("type") String type) {
        int startNum = (currentPage - 1) * maxSize;
        switch (type) {
            case "titleasc":
                return MapUtil.setMap(commodityService.sortResultAmount(sortId), maxSize, currentPage, commodityService.queryCommodityBySortId(sortId,startNum,maxSize));
            case "titledesc":
                return MapUtil.setMap(commodityService.sortResultAmount(sortId), maxSize, currentPage, commodityService.queryCommodityBySortIdDESC(sortId,startNum,maxSize));
            case "priceasc":
                return MapUtil.setMap(commodityService.sortResultAmount(sortId), maxSize, currentPage, commodityService.queryCommodityBySortIdPriceASC(sortId,startNum,maxSize));
            case "pricedesc":
                return MapUtil.setMap(commodityService.sortResultAmount(sortId), maxSize, currentPage, commodityService.queryCommodityBySortIdPriceDESC(sortId,startNum,maxSize));
            default:
                return MapUtil.setMap(commodityService.sortResultAmount(sortId), maxSize, currentPage, commodityService.queryCommodityBySortId(sortId,startNum,maxSize));
        }
    }
}
