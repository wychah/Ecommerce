package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.Order;
import com.wsz.ecommerce.domain.OrderCheck;
import com.wsz.ecommerce.domain.SubOrder;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface OrderService {
    String setOrderId(int userId);
    String orderGenerate(OrderCheck orderCheck,HttpServletRequest request);
    String fakeOrderGenerate(String orderId,int userId, int commodityId, int amount,HttpServletRequest request);
    Map getFinalOrderInfo(String orderId);
    Map showOrderInfo(int userId, int commodityId, int amount, HttpServletRequest request);
    String checkCommodityInventory(int commodityId, int amount);
}
