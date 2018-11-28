package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.CommodityDao;
import com.wsz.ecommerce.domain.CommodityDetail;
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
    public List<CommodityDetail> queryCommodityByTitle(String title) {
        return commodityDao.queryCommodityByTitle(title);
    }
}
