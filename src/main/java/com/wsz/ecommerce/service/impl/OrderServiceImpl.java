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
    public String orderGenerate(OrderCheck orderCheck) {
        if (orderDao.getOrderStatus(orderCheck.getOrderId()).equals("待提交")) {
            try {
                orderDao.updateOrder(orderCheck.getOrderId(),orderCheck.getAddressId(),"待发货",orderCheck.getOrderAmount());
                return "订单提交成功";
            } catch (Exception e) {
                orderDao.backToCart(orderCheck.getUserId(),orderCheck.getCommodityId(),orderCheck.getAmount());
                orderDao.deleteFakeOrder(orderCheck.getOrderId());
                return "订单提交失败";
            }
        } else {
            return "订单已提交,请勿重复提交订单";
        }
    }

    @Override
    public String fakeOrderGenerate(String orderId, int userId, int commodityId, int amount) {
        int inventory = commodityDao.getCommodityInventory(commodityId);
        if (inventory > 0) {
            commodityDao.commoditySold(commodityId, inventory - amount);

            Order order = new Order();
            order.setOrderId(orderId);
            order.setUserId(userId);
            order.setOrderStatus("待提交");
            orderDao.insertOrder(order);

            SubOrder subOrder = new SubOrder();
            subOrder.setOrderId(orderId);
            subOrder.setCommodityId(commodityId);
            subOrder.setAmount(amount);
            orderDao.insertSubOrder(subOrder);

            return "订单生成成功";
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
        String orderId = setOrderId(userId);
        List<ReceiverInfo> receiverInfo = addressDao.findReceiverInfoById(userId);
        map.put("orderInfo",commodityDao.getOrderInfo(commodityId, amount));
        map.put("receiverInfo",receiverInfo);
        map.put("orderId",orderId);
        fakeOrderGenerate(orderId,userId,commodityId,amount);
        return map;
    }

    @Override
    public String checkCommodityInventory(int commodityId, int amount) {
        if (commodityDao.getCommodityInventory(commodityId) < amount) {
            return "库存不足";
        } else {
            return "可以购买";
        }
    }
}
