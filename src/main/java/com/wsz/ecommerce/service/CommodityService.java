package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.CommodityBrief;
import com.wsz.ecommerce.domain.CommodityDetail;

import java.util.List;

public interface CommodityService {

    CommodityDetail getCommodityById(Integer id);

    List<CommodityBrief> queryCommodityByTitle(String title, int startNum, int maxSize);

    List<CommodityBrief> queryAllCommodity(int startNum, int maxSize);

    double allCommoodityAmount();

    double resultAmount(String title);

    double sortResultAmount(Integer sortId);

    List<CommodityBrief> queryAllCommodityByPriceASC(int startNum, int maxSize);

    List<CommodityBrief> queryAllCommodityByPriceDESC(int startNum, int maxSize);

    List<CommodityBrief> searchCommodityByPriceASC(String title, int startNum, int maxSize);

    List<CommodityBrief> searchCommodityByPriceDESC(String title, int startNum, int maxSize);

    List<CommodityBrief> queryAllCommodityDESC(int startNum, int maxSize);

    List<CommodityBrief> searchCommodityByTitleASC(String title, int startNum, int maxSize);

    List<CommodityBrief> searchCommodityByTitleDESC(String title, int startNum, int maxSize);

    List<CommodityBrief> queryCommodityBySortId(Integer sortId, int startNum, int maxSize);
}
