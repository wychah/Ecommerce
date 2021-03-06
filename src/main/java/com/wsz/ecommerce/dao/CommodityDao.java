package com.wsz.ecommerce.dao;

import com.wsz.ecommerce.domain.CommodityBrief;
import com.wsz.ecommerce.domain.CommodityDetail;
import com.wsz.ecommerce.domain.OrderInfo;
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
    List<CommodityBrief> queryCommodityByTitle(@Param("commodityTitle") String title, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 查询所有商品(默认按名称升序)
     * @return
     */
    List<CommodityBrief> queryAllCommodity(@Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 所有商品按名称降序排列
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> queryAllCommodityDESC(@Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 商品总数
     * @return
     */
    double allCommoodityAmount();

    /**
     * 查询到的商品总数
     * @param title
     * @return
     */
    double resultAmount(@Param("commodityTitle") String title);

    /**
     * 按种类查询到的商品总数
     * @param sortId
     * @return
     */
    double sortResultAmount(@Param("sortId") Integer sortId);

    double rangeResultAmount(@Param("minPrice") int minPrice, @Param("maxPrice") int maxPrice);

    double priceOverAmount(@Param("minPrice") int minPrice);

    /**
     * 按价格从低到高排列所有商品
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> queryAllCommodityByPriceASC(@Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 按价格从高到低排列所有商品
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> queryAllCommodityByPriceDESC(@Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 按价格从低到高排列搜索商品
     * @param title
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> searchCommodityByPriceASC(@Param("commodityTitle") String title, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 按价格从高到低排列搜索商品
     * @param title
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> searchCommodityByPriceDESC(@Param("commodityTitle") String title, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 按标题从低到高排列搜索商品
     * @param title
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> searchCommodityByTitleASC(@Param("commodityTitle") String title, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 按标题从高到低排列搜索商品
     * @param title
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> searchCommodityByTitleDESC(@Param("commodityTitle") String title, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 根据商品种类查询(名称升序)
     * @param sortId
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> queryCommodityBySortId(@Param("sortId") Integer sortId, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 通过价格区间查询商品
     * @param minPrice
     * @param maxPrice
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> searchCommodityBetweenPrice(@Param("minPrice") int minPrice, @Param("maxPrice") int maxPrice, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 查询价格大于minPrice的商品
     * @param minPrice
     * @param startNum
     * @param maxSize
     * @return
     */
    List<CommodityBrief> priceMoreThan(@Param("minPrice") int minPrice, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    List<CommodityBrief> queryCommodityBySortIdDESC(@Param("sortId") Integer sortId, @Param("startNum") int startNum, @Param("maxSize") int maxSize);
    List<CommodityBrief> queryCommodityBySortIdPriceASC(@Param("sortId") Integer sortId, @Param("startNum") int startNum, @Param("maxSize") int maxSize);
    List<CommodityBrief> queryCommodityBySortIdPriceDESC(@Param("sortId") Integer sortId, @Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 返回当前订单信息
     * @param id
     * @param amount
     * @return
     */
    OrderInfo getOrderInfo(@Param("commodityId") Integer id, @Param("amount") int amount);

    /**
     * 查找二手商品（成色不为全新）
     * @return
     */
    List<CommodityBrief> getSecondHand(@Param("startNum") int startNum, @Param("maxSize") int maxSize);

    /**
     * 查找二手电器
     * @return
     */
    List<CommodityBrief> getSecondHandAppliance(@Param("startNum") int startNum, @Param("maxSize") int maxSize);

    int getCommodityInventory(@Param("commodityId") int commodityId);

    void commoditySold(@Param("commodityId") int commodityId, @Param("commodityInventory") int commodityInventory);

    List<String> searchCommodityByTitleKeyword(@Param("keyword") String keyword);

    /**
     * 用户取消订单还原库存
     * @param commodityId
     * @return
     */
    int recoverCommodityInventory(@Param("commodityId") int commodityId,@Param("commodityInventory") int commodityInventory);
}
