package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private CommodityService commodityService;

    @GetMapping("/{commodityTitle}")
    public List<CommodityDetail> searchCommodity(@PathVariable("commodityTitle") String title) {
        return commodityService.queryCommodityByTitle(title);
    }
}
