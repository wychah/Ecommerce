package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.OrderDao;
import com.wsz.ecommerce.domain.Order;
import com.wsz.ecommerce.domain.OrderCheck;
import com.wsz.ecommerce.domain.SubOrder;
import com.wsz.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    /**
     * 生成订单编号
     * userId + 时间戳 + 时间戳长度
     *
     * 时间戳转换成日期
     * String ntime = sd.format(unixTimestamp * 1000);
     *
     * @param userId
     * @return
     */
    @Override
    public String setOrderId(int userId) {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = sd.format(new Date());
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long unixTimestamp = date.getTime() / 1000;
        int length = String.valueOf(unixTimestamp).length();
        String orderId = userId + "" + unixTimestamp + "" + length;
        return orderId;
    }

    @Override
    public void orderGenerate(String orderId, OrderCheck orderCheck) {
        Order order = new Order();
        order.setOrderId(orderId);
        order.setUserId(orderCheck.getUserId());
        order.setAddressId(orderCheck.getAddressId());
        order.setOrderAmount(orderCheck.getOrderAmount());
        order.setOrderStatus("待发货");
        orderDao.insertOrder(order);

        SubOrder subOrder = new SubOrder();
        subOrder.setOrderId(orderId);
        subOrder.setCommodityId(orderCheck.getCommodityId());
        subOrder.setAmount(orderCheck.getAmount());
        orderDao.insertSubOrder(subOrder);
    }

    @Override
    public Map getFinalOrderInfo(String orderId) {
        Map map = new HashMap();
        map.put("commodities",orderDao.findOrderCommodityInfo(orderId));
        map.put("orderInfo",orderDao.findOrderReceiverInfo(orderId));
        return map;
    }
}
