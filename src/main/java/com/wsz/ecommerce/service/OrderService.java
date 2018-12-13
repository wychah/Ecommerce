package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.Order;
import com.wsz.ecommerce.domain.OrderCheck;
import com.wsz.ecommerce.domain.SubOrder;

import java.util.Map;

public interface OrderService {
    String setOrderId(int userId);
    String orderGenerate(OrderCheck orderCheck);
    String fakeOrderGenerate(String orderId,int userId, int commodityId, int amount);
    Map getFinalOrderInfo(String orderId);
    Map showOrderInfo(int userId, int commodityId, int amount);
}
