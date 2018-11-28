package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.CommodityDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommodityService {

    CommodityDetail getCommodityById(Integer id);

    List<CommodityDetail> queryCommodityByTitle(String title);

    List<CommodityDetail> queryAllCommodity();
}
