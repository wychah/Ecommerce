package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.Order;
import com.wsz.ecommerce.domain.OrderCheck;
import com.wsz.ecommerce.domain.SubOrder;

import java.util.Map;

public interface OrderService {
    String setOrderId(int userId);
    void orderGenerate(String orderId, OrderCheck orderCheck);
    Map getFinalOrderInfo(String orderId);
    Map showOrderInfo(int userId, int commodityId, int amount);
}
