package com.wsz.ecommerce.dao;

import com.wsz.ecommerce.domain.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface OrderDao {
    /**
     * 生成订单
     * @param order
     */
    void insertOrder(Order order);

    /**
     * 生成副订单
     * @param subOrder
     */
    void insertSubOrder(SubOrder subOrder);

    /**
     * 查找指定订单的商品信息
     * @param orderId
     * @return
     */
    List<OrderCommodityInfo> findOrderCommodityInfo(@Param("orderId") String orderId);

    /**
     * 查找指定订单的收货人信息
     * @param orderId
     * @return
     */
    OrderReceiverInfo findOrderReceiverInfo(@Param("orderId") String orderId);

    /**
     * 更新订单
     * @param orderId
     * @param addressId
     * @param orderStatus
     * @param orderAmount
     */
    void updateOrder(@Param("orderId") String orderId, @Param("addressId") int addressId, @Param("orderStatus") String orderStatus, @Param("orderAmount") int orderAmount, @Param("orderDate") Date orderDate);

    /**
     * 查看指定订单状态
     * @param orderId
     * @return
     */
    String getOrderStatus(@Param("orderId") String orderId);

    /**
     * 订单失败，退回购物车
     * @param userId
     * @param commodityId
     * @param amount
     */
    int backToCart(@Param("userId") int userId, @Param("commodityId") int commodityId, @Param("amount") int amount, @Param("addTime") Date addTime);

    /**
     * 删除无效订单
     * @param userId
     */
    int deleteFakeOrder(@Param("userId") int userId);

    /**
     * @param userId 用户Id
     * @return 用户的待提交的订单
     */
    List<UserOrderInfo> getWaitPush(@Param("userId") int userId);

    /**
     *
     * @param userId 用户Id
     * @return 用户待发货的订单
     */
    List<UserOrderInfo> getWaitSend(@Param("userId") int userId);

    /**
     *
     * @param userId 用户ID
     * @return 用户已完成的订单
     */
    List<UserOrderInfo> getCompleted(@Param("userId") int userId);

    /**
     *
     * @param orderId 用户Id
     * @return 删除用户的订单
     */
    int orderDelete(@Param("orderId") String orderId);

    /**
     * 查询订单中的所有商品Id
     * @param orderId
     * @return
     */
    List<OrderCommodityAmount> getOrderCommodityAmount(@Param("orderId") String orderId);
}
