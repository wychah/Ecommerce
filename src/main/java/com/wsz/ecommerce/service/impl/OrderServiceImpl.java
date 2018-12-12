package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.AddressDao;
import com.wsz.ecommerce.dao.CommodityDao;
import com.wsz.ecommerce.dao.OrderDao;
import com.wsz.ecommerce.domain.Order;
import com.wsz.ecommerce.domain.OrderCheck;
import com.wsz.ecommerce.domain.ReceiverInfo;
import com.wsz.ecommerce.domain.SubOrder;
import com.wsz.ecommerce.service.CommodityService;
import com.wsz.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private CommodityDao commodityDao;

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
    public String orderGenerate(String orderId, OrderCheck orderCheck) {
        int inventory = commodityDao.getCommodityInventory(orderCheck.getCommodityId());
        if (inventory > 0) {
            commodityDao.commoditySold(orderCheck.getCommodityId(), inventory - 1);

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

            return "订单提交成功";
        } else {
            return "库存不足";
        }
    }

    @Override
    public Map getFinalOrderInfo(String orderId) {
        Map map = new HashMap();
        map.put("commodities",orderDao.findOrderCommodityInfo(orderId));
        map.put("orderInfo",orderDao.findOrderReceiverInfo(orderId));
        return map;
    }

    @Override
    public Map showOrderInfo(int userId, int commodityId, int amount) {
        Map map = new HashMap();
        List<ReceiverInfo> receiverInfo = addressDao.findReceiverInfoById(userId);
        map.put("orderInfo",commodityDao.getOrderInfo(commodityId, amount));
        map.put("receiverInfo",receiverInfo);
        return map;
    }
}
