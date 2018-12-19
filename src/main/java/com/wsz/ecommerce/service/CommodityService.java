package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.CommodityBrief;
import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.domain.OrderInfo;

import java.util.List;
import java.util.Map;

public interface CommodityService {

    Map getCommodityById(Integer id);

    List<CommodityBrief> queryCommodityByTitle(String title, int startNum, int maxSize);

    Map queryAllCommodity(int startNum, int maxSize);

    List<CommodityBrief> findAll(int startNum, int maxSize);

    double allCommoodityAmount();

    double resultAmount(String title);

    double sortResultAmount(Integer sortId);

    double rangeResultAmount(int minPrice, int maxPrice);

    double priceOverAmount(int minPrice);

    List<CommodityBrief> queryAllCommodityByPriceASC(int startNum, int maxSize);

    List<CommodityBrief> queryAllCommodityByPriceDESC(int startNum, int maxSize);

    List<CommodityBrief> searchCommodityByPriceASC(String title, int startNum, int maxSize);

    List<CommodityBrief> searchCommodityByPriceDESC(String title, int startNum, int maxSize);

    List<CommodityBrief> queryAllCommodityDESC(int startNum, int maxSize);

    List<CommodityBrief> searchCommodityByTitleASC(String title, int startNum, int maxSize);

    List<CommodityBrief> searchCommodityByTitleDESC(String title, int startNum, int maxSize);

    List<CommodityBrief> queryCommodityBySortId(Integer sortId, int startNum, int maxSize);

    List<CommodityBrief> searchCommodityBetweenPrice(int minPrice, int maxPrice, int startNum, int maxSize);

    List<CommodityBrief> priceMoreThan(int minPrice, int startNum, int maxSize);

    List<CommodityBrief> queryCommodityBySortIdDESC(Integer sortId, int startNum, int maxSize);
    List<CommodityBrief> queryCommodityBySortIdPriceASC(Integer sortId, int startNum, int maxSize);
    List<CommodityBrief> queryCommodityBySortIdPriceDESC(Integer sortId, int startNum, int maxSize);

    OrderInfo getOrderInfo(Integer id, int amount);

    List<CommodityBrief> getSecondHand(int startNum, int maxSize);
    List<CommodityBrief> getSecondHandAppliance(int startNum, int maxSize);

    List<String> searchCommodityByTitleKeyword(String keyword);
}
