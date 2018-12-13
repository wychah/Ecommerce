package com.wsz.ecommerce.dao;

import org.apache.ibatis.annotations.Param;

import java.util.Date;

public interface CartDao {
    int deleteShoppingCart(@Param("userId") int userId,@Param("commodityId") int commodityId);
    int addShoppingCart(@Param("userId") int userId,
                        @Param("commodityId") int commodityId,
                        @Param("amount") int amount,
                        @Param("addTime") Date addTime);
    //返回是不是有了
    int ifexist(@Param("userId") int userId,@Param("commodityId") int commodityId);
    //查有多少个了
    int findAmount(@Param("userId") int userId,@Param("commodityId") int commodityId);
    //更新购物车
    int updataCart(@Param("userId") int userId,
                   @Param("commodityId") int commodityId,
                   @Param("amount") int amount,
                   @Param("addTime") Date addTime);
}
