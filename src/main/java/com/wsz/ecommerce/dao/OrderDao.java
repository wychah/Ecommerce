package com.wsz.ecommerce.dao;

import com.wsz.ecommerce.domain.Order;
import com.wsz.ecommerce.domain.OrderCommodityInfo;
import com.wsz.ecommerce.domain.OrderReceiverInfo;
import com.wsz.ecommerce.domain.SubOrder;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderDao {
    void insertOrder(Order order);
    void insertSubOrder(SubOrder subOrder);
    List<OrderCommodityInfo> findOrderCommodityInfo(@Param("orderId") String orderId);
    OrderReceiverInfo findOrderReceiverInfo(@Param("orderId") String orderId);
}
