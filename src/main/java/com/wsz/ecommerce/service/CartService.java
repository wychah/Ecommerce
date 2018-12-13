package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.CommodityCart;

import java.util.List;

public interface CartService {
    List<CommodityCart> deleteCommodity(int userId,int commodityId);
    List<CommodityCart> addCommodity(int userId,int commodityId,int amount);
}
