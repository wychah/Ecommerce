package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.CommodityDao;
import com.wsz.ecommerce.domain.CommodityBrief;
import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.domain.OrderInfo;
import com.wsz.ecommerce.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommodityServiceImpl implements CommodityService {

    @Autowired
    private CommodityDao commodityDao;

    @Override
    public CommodityDetail getCommodityById(Integer id) {
        return commodityDao.getCommodityById(id);
    }

    @Override
    public List<CommodityBrief> queryCommodityByTitle(String title, int startNum, int maxSize) {
        return commodityDao.queryCommodityByTitle(title,startNum,maxSize);
    }

    @Override
    public List<CommodityBrief> queryAllCommodity(int startNum, int maxSize) {
        return commodityDao.queryAllCommodity(startNum,maxSize);
    }

    @Override
    public double allCommoodityAmount() {
        return commodityDao.allCommoodityAmount();
    }

    @Override
    public double resultAmount(String title) {
        return commodityDao.resultAmount(title);
    }

    @Override
    public double sortResultAmount(Integer sortId) {
        return commodityDao.sortResultAmount(sortId);
    }

    @Override
    public double rangeResultAmount(int minPrice, int maxPrice) {
        return commodityDao.rangeResultAmount(minPrice, maxPrice);
    }

    @Override
    public double priceOverAmount(int minPrice) {
        return commodityDao.priceOverAmount(minPrice);
    }

    @Override
    public List<CommodityBrief> queryAllCommodityByPriceASC(int startNum, int maxSize) {
        return commodityDao.queryAllCommodityByPriceASC(startNum,maxSize);
    }

    @Override
    public List<CommodityBrief> queryAllCommodityByPriceDESC(int startNum, int maxSize) {
        return commodityDao.queryAllCommodityByPriceDESC(startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> searchCommodityByPriceASC(String title, int startNum, int maxSize) {
        return commodityDao.searchCommodityByPriceASC(title,startNum,maxSize);
    }

    @Override
    public List<CommodityBrief> searchCommodityByPriceDESC(String title, int startNum, int maxSize) {
        return commodityDao.searchCommodityByPriceDESC(title, startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> queryAllCommodityDESC(int startNum, int maxSize) {
        return commodityDao.queryAllCommodityDESC(startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> searchCommodityByTitleASC(String title, int startNum, int maxSize) {
        return commodityDao.searchCommodityByTitleASC(title, startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> searchCommodityByTitleDESC(String title, int startNum, int maxSize) {
        return commodityDao.searchCommodityByTitleDESC(title, startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> queryCommodityBySortId(Integer sortId, int startNum, int maxSize) {
        return commodityDao.queryCommodityBySortId(sortId, startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> searchCommodityBetweenPrice(int minPrice, int maxPrice, int startNum, int maxSize) {
        return commodityDao.searchCommodityBetweenPrice(minPrice, maxPrice, startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> priceMoreThan(int minPrice, int startNum, int maxSize) {
        return commodityDao.priceMoreThan(minPrice, startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> queryCommodityBySortIdDESC(Integer sortId, int startNum, int maxSize) {
        return commodityDao.queryCommodityBySortIdDESC(sortId, startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> queryCommodityBySortIdPriceASC(Integer sortId, int startNum, int maxSize) {
        return commodityDao.queryCommodityBySortIdPriceASC(sortId, startNum, maxSize);
    }

    @Override
    public List<CommodityBrief> queryCommodityBySortIdPriceDESC(Integer sortId, int startNum, int maxSize) {
        return commodityDao.queryCommodityBySortIdPriceDESC(sortId, startNum, maxSize);
    }

    @Override
    public OrderInfo getOrderInfo(Integer id, int amount) {
        return commodityDao.getOrderInfo(id, amount);
    }
}
