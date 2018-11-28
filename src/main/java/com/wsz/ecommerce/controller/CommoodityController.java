package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/commodity")
public class CommoodityController {

    @Autowired
    private CommodityService commodityService;

    @GetMapping("/{commodityId}")
    public CommodityDetail getTheCommodity(@PathVariable("commodityId") Integer commodityId) {
        return commodityService.getCommodityById(commodityId);
    }
}
