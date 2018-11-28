package com.wsz.ecommerce.dao;

import com.wsz.ecommerce.domain.CommodityDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommodityDao {

    /**
     * 获取当前商品的详细信息
     * @param id
     * @return
     */
    CommodityDetail getCommodityById(@Param("commodityId") Integer id);

    /**
     * 搜索商品
     * @param title
     * @return
     */
    List<CommodityDetail> queryCommodityByTitle(@Param("commodityTitle") String title);

    /**
     * 查询所有商品
     * @return
     */
    List<CommodityDetail> queryAllCommodity();
}
